import { createContext, useContext, useState, useEffect } from "react";
import {
  doc,
  collection,
  setDoc,
  getDocs,
  addDoc,
  onSnapshot,
  query,
} from "@firebase/firestore";
import { db } from "../firebase-config";
import { useAuth } from "./AuthContext";
import { getAuth } from "@firebase/auth";

const dbContext = createContext();

export const useDB = () => {
  return useContext(dbContext);
};

export default function DbContext({ children }) {
  const [boardName, setBoardName] = useState("");
  const [lists, setLists] = useState([]);
  const usersCol = collection(db, "users");

  const { currentUser } = useAuth();

  // useEffect(() => {
  //   const unsub = onSnapshot((snapshot) => {});

  //   return unsub;
  // }, []);

  const listenToBoardChange = () => {
    const q = query(collection(db, `users/${currentUser}/new-board`));
    return onSnapshot(q, (snapShot) => {
      console.log(snapShot.docs);
      setLists(snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  console.log(lists);

  const createProfile = (user) => {
    return setDoc(doc(usersCol, user), { title: user });
  };

  const getDocuments = async () => {
    const res = await getDocs(usersCol);
    return res;
    // return res.docs.map((doc) => doc.id);
  };

  const createBoard = (name) => {
    setBoardName(name);

    const { currentUser } = getAuth();
    const userColRef = collection(
      db,
      `users/${currentUser.displayName}/${name}`
    );
    createList(userColRef, "test-list"); // sample list
  };

  const createList = (boardRef, listTitle) => {
    const docRef = doc(boardRef, listTitle);
    setDoc(docRef, { title: listTitle });
    createNote(docRef, "it worked!!!"); // sample note
  };

  const createNote = (boardRef, noteTxt) => {
    const NoteColRef = collection(boardRef, "notes");
    return addDoc(NoteColRef, {
      txt: noteTxt,
      someth: "random stuff",
    }); // auto generate id
  };

  const value = {
    createProfile,
    createBoard,
    getDocuments,
    listenToBoardChange,
    lists
  };

  return <dbContext.Provider value={value}>{children}</dbContext.Provider>;
}

const temp = {
  user: {
    board: {
      list: {
        title: "title",
        notes: ["note1", "note2"],
      },
    },
  },
};
