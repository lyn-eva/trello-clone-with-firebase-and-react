import { useState, useEffect } from "react";
import { getAuth } from "@firebase/auth";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

import ProfileHeader from "./ProfileHeader";
import { useDB } from "../context/DbContext";
import Button from "../utility/Button";
import CreateNewBoard from "./CreateNewBoard";

function Profile() {
  const { boards, deleteBoard, checkIfUserExists, createProfile } = useDB();
  const { currentUser } = getAuth();
  const [newBoard, setNewBoard] = useState(false);

  const navigate = useNavigate();

  // const path = useLocation();
  // useEffect(() => {
  //   if (!currentUser) return;
  //   checkIfUserExists(path.pathname.match(/(?<=^\/)\w+/gi)[0]).then((res) => {
  //     if (res.data()) return;
  //     createProfile();
  //   });
  // }, [path.pathname]);

  // useEffect(() => {
  //   checkIfUserExists().then((users) => {
  //     const userdocs = users.docs.map((doc) => doc.id);
  //     if (userdocs?.indexOf(currentUser.displayName) === -1) {
  //       // create firestore path if the user is new signup
  //       createProfile(currentUser.displayName);
  //     }
  //   });
  // }, []);

  const handleClick = (e, id) => {
    if (e.target.tagName === "BUTTON") return;
    navigate(id);
  };

  return (
    <div className="p-2 bg-[#0079bf] h-fit min-h-screen">
      <ProfileHeader />
      <main className="mt-8 text-white">
        <h2>{currentUser?.displayName}</h2>
        <h1 className="mb-4 text-2xl">Your Boards</h1>
        <ul className="grid grid-rows-1 grid-cols-[repeat(4,230px)] gap-4 overflow-x-scroll h-[calc(100vh-170px)]">
          {boards.map(({ title, id, bg }) => (
            <li
              key={id}
              onClick={(e) => handleClick(e, id)}
              className={`bg-[${bg}] h-40 w-full rounded-md p-3 hover:opacity-80 cursor-pointer relative group`}
            >
              <h3 className="font-medium text-2xl">{title}</h3>
              <Button
                clickFunc={() => {
                  deleteBoard(id);
                }}
                className="absolute right-3 bottom-3 text-[18px] hidden group-hover:inline-block"
              >
                <i className="fas fa-times pointer-events-none"></i>
              </Button>
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
