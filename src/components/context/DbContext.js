import { createContext, useContext, useState, useEffect } from "react";
import {
  doc,
  collection,
  setDoc,
  getDoc,
  addDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  query,
  orderBy,
  deleteDoc,
  writeBatch,
} from "@firebase/firestore";

import { db } from "../firebase-config";
import { useAuth } from "./AuthContext";

const dbContext = createContext();

export const useDB = () => {
  return useContext(dbContext);
};

export default function DbContext({ children }) {
  const [boards, setBoards] = useState([]);
  const [lists, setLists] = useState({}); // needn't an object
  const [notes, setNotes] = useState({});
  const [boardPath, setBoardPath] = useState("");

  const [currentBoard, setCurrentBoard] = useState({}); //

  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;
    const unsubBoardListener = listenToBoardChange();
    if (!currentBoard) return;
    setBoardPath(`users/${currentUser?.displayName}/boards/${currentBoard.id}`);
    const unsubListeners = listenToListChange();

    return () => {
      unsubBoardListener();
      unsubListeners.forEach((unsub) => unsub());
    };
  }, [currentUser, currentBoard, boardPath]); // this won't be infinite loop

  const reqBoardDetails = (id) => {
    const path = `users/${currentUser?.displayName}/boards/${id}`;
    onSnapshot(doc(db, path), (snapShot) => {
      setCurrentBoard({ ...snapShot.data(), id: snapShot.id });
    });
  };

  const listenToBoardChange = () => {
    const path = `users/${currentUser?.displayName}/boards`;
    return onSnapshot(collection(db, path), (snapShot) => {
      setBoards(snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  const listenToListChange = () => {
    const listeners = [];
    const path = `${boardPath}/lists`;
    const unsub = onSnapshot(
      query(collection(db, path), orderBy("order")),
      (snapShot) => {
        const listItems = snapShot.docs.reduce(
          (total, doc) => (total = { ...total, [doc.id]: { ...doc.data(), id: doc.id } }),
          {}
        );
        setLists(listItems);
        snapShot.docs.forEach((doc) => {
          const unsub = listenToNoteChange(doc.id);
          listeners.push(unsub);
        });
      }
    );
    listeners.push(unsub);
    return listeners;
  };

  const listenToNoteChange = (listId) => {
    const notePath = `${boardPath}/lists/${listId}/notes`;
    const unsub = onSnapshot(
      query(collection(db, notePath), orderBy("order")),
      (snapShot) => {
        const noteItems = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setNotes((prev) => ({ ...prev, [listId]: noteItems }));
      }
    );
    return unsub;
  };

  // console.log('%c Oh my heavens! ', 'background: #222; color: #bada55')

  const createProfile = (user) => {
    return setDoc(doc(db, "users/" + user), {
      title: user,
      createdAt: serverTimestamp(),
      lastModified: serverTimestamp(),
    });
  };

  const updateBoard = (newValues) => {
    if (newValues.bg === currentBoard.bg) return;
    updateDoc(doc(db, boardPath), { ...newValues, lastModified: serverTimestamp() });
  };

  const checkIfUserExists = (name) => {
    const path = `users/${name}`;
    return getDoc(doc(db, path));
  };

  const createBoard = (boardName) => {
    const path = `users/${currentUser.displayName}/boards`;
    return addDoc(collection(db, path), {
      title: boardName,
      bg: "#0079bf",
      createdAt: serverTimestamp(),
      lastModified: serverTimestamp(),
    });
  };

  const createList = (listTitle, order) => {
    const path = `${boardPath}/lists`;
    addDoc(collection(db, path), {
      title: listTitle,
      order: order,
      createdAt: serverTimestamp(),
      lastModified: serverTimestamp(),
    });
  };

  const createNote = (id, order, noteTxt) => {
    const path = `${boardPath}/lists/${id}/notes`;
    addDoc(collection(db, path), {
      title: noteTxt,
      order: order,
      createdAt: serverTimestamp(),
      lastModified: serverTimestamp(),
    });
  };

  const updateList = (id, newValues) => {
    const path = `${boardPath}/lists/${id}`;
    return updateDoc(doc(db, path), { ...newValues, lastModified: serverTimestamp() });
  };

  const updateNote = (listId, noteId, newValues) => {
    const path = `${boardPath}/lists/${listId}/notes/${noteId}`;
    updateDoc(doc(db, path), { ...newValues, lastModified: serverTimestamp() });
  };

  const deleteList = (id) => {
    const path = `${boardPath}/lists/${id}`;
    deleteDoc(doc(db, path));
  };

  const deleteNote = (listId, noteId) => {
    const path = `${boardPath}/lists/${listId}/notes/${noteId}`;
    deleteDoc(doc(db, path));
  };

  const deleteBoard = (id) => {
    const path = `users/${currentUser.displayName}/boards/${id}`;
    deleteDoc(doc(db, path));
  };

  const listDndOperation = (listArray) => {
    const batch = writeBatch(db);
    listArray.forEach(({ id }, index) => {
      const path = `${boardPath}/lists/${id}`;
      batch.update(doc(db, path), { order: index });
    });
    batch.commit();
  };

  const noteDndForSameList = (listId, noteArray) => {
    const batch = writeBatch(db);
    noteArray.forEach(({ id }, index) => {
      const path = `${boardPath}/lists/${listId}/notes/${id}`;
      batch.update(doc(db, path), { order: index });
    });
    batch.commit();
  };

  const noteDndAmongDiffLists = (draggedNote, source, target, sourceList, targetList) => {
    const batch = writeBatch(db);
    batch.delete(
      doc(db, `${boardPath}/lists/${source.droppableId}/notes/${draggedNote.id}`)
    );

    batch.set(
      doc(db, `${boardPath}/lists/${target.droppableId}/notes/${draggedNote.id}`),
      {
        title: draggedNote.title,
        order: target.index,
        createdAt: draggedNote.createdAt,
        lastModified: serverTimestamp(),
      }
    );

    targetList.forEach(({ id }, index) => {
      const path = `${boardPath}/lists/${target.droppableId}/notes/${id}`;
      batch.update(doc(db, path), { order: index });
    });

    sourceList.forEach(({ id }, index) => {
      const path = `${boardPath}/lists/${source.droppableId}/notes/${id}`;
      batch.update(doc(db, path), { order: index });
    });
    batch.commit();
  };

  const value = {
    createProfile,
    createBoard,
    createList,
    checkIfUserExists,
    lists,
    setLists,
    boards,
    setCurrentBoard,
    currentBoard,
    reqBoardDetails,
    updateList,
    createNote,
    deleteList,
    updateNote,
    deleteNote,
    updateBoard,
    deleteBoard,
    noteDndForSameList,
    noteDndAmongDiffLists,
    listDndOperation,
    notes,
  };

  return <dbContext.Provider value={value}>{children}</dbContext.Provider>;
}
