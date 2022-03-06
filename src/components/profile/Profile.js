import { useState, useEffect } from "react";
import { getAuth } from "@firebase/auth";
import { useNavigate } from "react-router";

import ProfileHeader from "./ProfileHeader";
import { useDB } from "../context/DbContext";
import Button from "../utility/Button";
import CreateNewBoard from "./CreateNewBoard";

function Profile() {
  const { boards } = useDB();
  const { currentUser } = getAuth();
  const [newBoard, setNewBoard] = useState(false);

  const navigate = useNavigate();
  // useEffect(() => {
  //   getDocuments().then((users) => {
  //     const userdocs = users.docs.map((doc) => doc.id);
  //     if (userdocs?.indexOf(currentUser.displayName) === -1) {
  //       // create firestore path if the user is new signup
  //       createProfile(currentUser.displayName);
  //     }
  //   });
  // }, []);

  const goToBoard = (id) => { //curry
    return () => {
      // setCurrentBoard(id);
      navigate(id);
    };
  };

  return (
    <div className="p-2 bg-[#0079bf] h-screen">
      <ProfileHeader />
      <main className="mt-8 text-white">
        <h2>{currentUser?.displayName}</h2>
        <h1 className="mb-4 text-2xl">Your Boards</h1>
        <ul className="grid grid-rows-3 grid-cols-4 gap-4">
          {boards.map(({ title, id }) => (
            <li
              key={id}
              onClick={goToBoard(id)}
              className="bg-orange-300 h-40 w-full rounded-md p-3 hover:opacity-80 cursor-pointer"
            >
              <h3 className="font-medium text-2xl">{title}</h3>
            </li>
          ))}
          <li>
            <Button
              clickFunc={() => setNewBoard(true)}
              className="h-40 w-full rounded-md p-3 text-3xl bg-hover-clr shadow-inner shadow-grey-500"
            >
              <i className="fas fa-plus" /> New
            </Button>
          </li>
        </ul>
        {newBoard && <CreateNewBoard setNewBoard={setNewBoard} />}
      </main>
    </div>
  );
}

export default Profile;
