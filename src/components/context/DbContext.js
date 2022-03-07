import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import {
  doc,
  collection,
  setDoc,
  getDocs,
  addDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  query,
  orderBy,
  deleteDoc
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
  const [notes, setNotes] = useState({});
  const [boardPath, setBoardPath] = useState('');

  const [currentBoard, setCurrentBoard] = useState({}); //

  const { currentUsername } = useAuth();

  useEffect(() => {
    if (!(currentUsername && currentBoard)) return; // inspect currentBoard
    setBoardPath(`users/${currentUsername}/boards/${currentBoard.id}`);
    const unsubBoardListener = listenToBoardChange();
    const unsubListListener = listenToListChange();
    
    return () => {
      unsubBoardListener();
      unsubListListener();
    };
  }, [currentUsername, currentBoard, boardPath]);

  useEffect(() => {
    if (!(currentUsername && currentBoard && lists.length)) return;
    const unsubNoteListener = listenToNoteChange();

    return () => {
      unsubNoteListener.forEach(unsub => {
        unsub();
      })
    };
  }, [lists, currentUsername, currentBoard]);

  const reqBoardDetails = (id) => {
    const path = `users/${currentUsername}/boards/${id}`;
    onSnapshot(doc(db, path), (snapShot) => {
      setCurrentBoard({ ...snapShot.data(), id: snapShot.id });
    });
  };

  const listenToBoardChange = () => {
    const path = `users/${currentUsername}/boards`;
    return onSnapshot(collection(db, path), (snapShot) => {
      setBoards(snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  const listenToListChange = () => {
    const path = `${boardPath}/lists`;
    console.log(path)
    return onSnapshot(query(collection(db, path), orderBy("createdAt")), (snapShot) => {
      setLists(snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };


  const listenToNoteChange = () => {
    const listeners = []
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
    return setDoc(doc(db, "users/" + user), { title: user });
  };

  const updateBoard = (...details) => {
    updateDoc(doc(db, boardPath), ...details);
  }

  const getDocuments = async () => {
    // const res = await getDocs(usersCol);
    // return res;
    // return res.docs.map((doc) => doc.id);
  };

  const createBoard = (boardName) => {
    const path = `users/${currentUsername}/boards`;
    return addDoc(collection(db, path), { title: boardName });
  };
  
  const createList = (listTitle) => {
    const path = `${boardPath}/lists`;
    addDoc(collection(db, path), { title: listTitle, createdAt: serverTimestamp(), lastModified: serverTimestamp()});
  };
  
  const createNote = (id, noteTxt) => {
    const path = `${boardPath}/lists/${id}/notes`;
    addDoc(collection(db, path), { title: noteTxt, createdAt: serverTimestamp(), lastModified: serverTimestamp()})
  };
  
  const updateList = (id, newTitle) => {
    const path = `${boardPath}/lists/${id}`;
    updateDoc(doc(db, path), {title: newTitle, lastModified: serverTimestamp()});
  }
  
  const updateNote = (listId, noteId, newTitle) => {
    const path = `${boardPath}/lists/${listId}/notes/${noteId}`;
    updateDoc(doc(db, path), {title: newTitle, lastModified: serverTimestamp()});
  }
  
  const deleteList = (id) => {
    const path = `${boardPath}/lists/${id}`;
    deleteDoc(doc(db, path));
  }

  const deleteNote = (listId, noteId) => {
    const path = `${boardPath}/lists/${listId}/notes/${noteId}`;
    deleteDoc(doc(db, path));
  }

  const value = {
    createProfile,
    createBoard,
    createList,
    getDocuments,
    lists,
    boards,
    notes,
    setCurrentBoard,
    currentBoard,
    reqBoardDetails,
    updateList,
    createNote,
    deleteList,
    updateNote,
    deleteNote,
    updateBoard
  };

  return <dbContext.Provider value={value}>{children}</dbContext.Provider>;
}
