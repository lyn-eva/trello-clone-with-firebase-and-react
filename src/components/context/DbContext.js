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
} from "@firebase/firestore";

import { db } from "../firebase-config";
import { useAuth } from "./AuthContext";

const dbContext = createContext();

export const useDB = () => {
  return useContext(dbContext);
};

export default function DbContext({ children }) {
  const [boards, setBoards] = useState([]);
  const [lists, setLists] = useState([]);
  const [notes, setNotes] = useState({})
  const [boardPath, setBoardPath] = useState("");

  // console.log('rerendered')
  const [currentBoard, setCurrentBoard] = useState({}); //

  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;
    const unsubBoardListener = listenToBoardChange();
    if (!currentBoard) return;
    setBoardPath(`users/${currentUser?.displayName}/boards/${currentBoard.id}`);
    const unsubListListener = listenToListChange();

    return () => {
      unsubBoardListener();
      unsubListListener();
    };
  }, [currentUser, currentBoard, boardPath]); // this won't be infinite loop

  const reqBoardDetails = (id) => {
    const path = `users/${currentUser?.displayName}/boards/${id}`;
    onSnapshot(doc(db, path), (snapShot) => {
      setCurrentBoard({ ...snapShot.data(), id: snapShot.id });
    });
  };

  const listenToListChange = () => {
    const path = `${boardPath}/lists`;
    return onSnapshot(query(collection(db, path), orderBy("order")), (snapShot) => {
      setLists(snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };
  // console.log(lists)

  const listenToBoardChange = () => {
    const path = `users/${currentUser?.displayName}/boards`;
    return onSnapshot(collection(db, path), (snapShot) => {
      setBoards(snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  const listenToNoteChange = () => {
    const listeners = [];
    lists.forEach((list) => {
      const path = `${boardPath}/lists/${list.id}/notes`;
      const unsub = onSnapshot(query(collection(db, path), orderBy("createdAt")), (snapShot) => {
        const notes = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setNotes((prevState) => ({ ...prevState, [list.id]: notes }));
      });
      listeners.push(unsub);
    });
    return listeners;
  };



  const createProfile = (user) => {
    return setDoc(doc(db, "users/" + user), {
      title: user,
      createdAt: serverTimestamp(),
      lastModified: serverTimestamp(),
    });
  };

  const updateBoard = (...details) => {
    updateDoc(doc(db, boardPath), ...details);
  };

  const checkIfUserExists = (name) => {
    const path = `users/${name}`;
    return getDoc(doc(db, path));
  };

  const createBoard = (boardName) => {
    const path = `users/${currentUser.displayName}/boards`;
    return addDoc(collection(db, path), { title: boardName, bg: "#0079bf" });
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

  const createNote = (id, noteTxt) => {
    const path = `${boardPath}/lists/${id}/notes`;
    addDoc(collection(db, path), {
      title: noteTxt,
      createdAt: serverTimestamp(),
      lastModified: serverTimestamp(),
    });
  };

  const updateList = (id, newValues) => {
    const path = `${boardPath}/lists/${id}`;
    updateDoc(doc(db, path), {...newValues, lastModified: serverTimestamp()});
  };
  // to repair
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
    console.log("delete", path);
    deleteDoc(doc(db, path));
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
  };

  return <dbContext.Provider value={value}>{children}</dbContext.Provider>;
}
