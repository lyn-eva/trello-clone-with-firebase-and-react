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
  getDocs,
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
  const [currentBoard, setCurrentBoard] = useState(null); //

  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;
    const unsubBoardListener = listenToBoardChange();
    setBoardPath(`users/${currentUser?.displayName}/boards/${currentBoard?.id}`);

    return () => {
      unsubBoardListener();
    };
  }, [currentUser, currentBoard]);

  useEffect(() => {
    if (!currentBoard) return;
    const unsubListeners = listenToListChange();
    return () => {
      unsubListeners.forEach((unsub) => unsub());
    };
  }, [boardPath]);

  const reqBoardDetails = (id) => {
    const path = `users/${currentUser.displayName}/boards/${id}`;
    onSnapshot(doc(db, path), (snapShot) => {
      setCurrentBoard({ ...snapShot.data(), id: snapShot.id });
    });
  };

  const listenToBoardChange = () => {
    const path = `users/${currentUser?.displayName}/boards`;
    return onSnapshot(query(collection(db, path), orderBy("createdAt")), (snapShot) => {
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

  const userAlreadyExists = async (username) => {
    const data = await getDoc(doc(db, `users/${username}`));
    return data.exists();
  };

  const createProfile = async (user) => {
    return setDoc(doc(db, "users/", user), {
      title: user,
      createdAt: serverTimestamp(),
      lastModified: serverTimestamp(),
    });
  };

  // createProfile('Zayar_Linn')

  const updateBoard = (newValues) => {
    if (newValues.bg === currentBoard.bg) return;
    updateDoc(doc(db, boardPath), { ...newValues, lastModified: serverTimestamp() });
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

  const createNote = (listId, order, noteTxt) => {
    const path = `${boardPath}/lists/${listId}/notes`;
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

  const deleteUserData = async() => {
    await Promise.all(boards.map(id => deleteBoard(id)));
    return deleteDoc(doc(db, `users/${currentUser.displayName}`));
  };

  const deleteBoard = async (id) => {
    const batch = writeBatch(db);
    const path = `users/${currentUser.displayName}/boards/${id}`;
    const listItems = await getDocs(collection(db, `${path}/lists`));
    const deleteNested = listItems.docs.map((Doc) => deleteList(Doc.id, batch)); // delete nested lists
    await Promise.all(deleteNested);
    batch.delete(doc(db, path));
    batch.commit();
  };

  const deleteList = async (id, Batch) => {
    const batch = Batch ?? writeBatch(db);
    const path = `${boardPath}/lists/${id}`;
    deleteDoc(doc(db, path));
    const noteList = await getDocs(collection(db, `${path}/notes`)); // get lists of deleted board
    const nestedNotes = noteList.docs.map((Doc) =>
      batch.delete(doc(db, `${path}/notes/${Doc.id}`))
    );
    const batchArray = await Promise.all(nestedNotes);
    const updatedList = Object.keys(lists).filter((key) => key !== id);
    updateListOrder(updatedList);
    return Batch ? batchArray : batch.commit();
  };

  const deleteNote = (listId, noteId, index) => {
    const path = `${boardPath}/lists/${listId}/notes/${noteId}`;
    deleteDoc(doc(db, path));
    const updatedArray = [...notes[listId]];
    updatedArray.splice(index, 1);
    updateNoteOrder(listId, updatedArray);
  };

  const updateListOrder = (listArray) => {
    const batch = writeBatch(db);
    listArray.forEach((id, index) => {
      const path = `${boardPath}/lists/${id}`;
      batch.update(doc(db, path), { order: index });
    });
    batch.commit();
  };

  const updateNoteOrder = (listId, noteArray) => {
    const batch = writeBatch(db);
    noteArray.forEach(({ id }, index) => {
      const path = `${boardPath}/lists/${listId}/notes/${id}`;
      batch.update(doc(db, path), { order: index });
    });
    batch.commit();
  };

  const updateNotesOrder = (draggedNote, source, target, sourceList, targetList) => {
    const batch = writeBatch(db),
      sourceId = source.droppableId,
      targetId = target.droppableId;

    const batchNote = (List, ListId) => {
      List.forEach(({ id }, index) => {
        const path = `${boardPath}/lists/${ListId}/notes/${id}`;
        batch.update(doc(db, path), { order: index });
      });
    };

    batch.delete(doc(db, `${boardPath}/lists/${sourceId}/notes/${draggedNote.id}`));
    batch.set(doc(db, `${boardPath}/lists/${targetId}/notes/${draggedNote.id}`), {
      ...draggedNote,
      order: target.index,
      lastModified: serverTimestamp(),
    });
    batchNote(targetList, targetId);
    batchNote(sourceList, sourceId);

    batch.commit();
  };

  const value = {
    boards,
    lists,
    notes,
    currentBoard,
    setCurrentBoard,
    reqBoardDetails,
    setLists,
    createProfile,
    createBoard,
    createList,
    createNote,
    updateBoard,
    updateList,
    updateNote,
    deleteBoard,
    deleteList,
    deleteNote,
    updateNoteOrder,
    updateNotesOrder,
    updateListOrder,
    userAlreadyExists,
    deleteUserData,
  };

  return <dbContext.Provider value={value}>{children}</dbContext.Provider>;
}
