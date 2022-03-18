import { useState, useEffect } from "react";
import { getAuth } from "@firebase/auth";
import { useNavigate } from "react-router";

import ProfileHeader from "./ProfileHeader";
import { useDB } from "../context/DbContext";
import Button from "../utility/Button";
import CreateNewBoard from "./CreateNewBoard";

function Profile() {
  const { boards, deleteBoard, checkIfUserExists, createProfile } = useDB();
  const { currentUser } = getAuth();
  const [newBoard, setNewBoard] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    checkIfUserExists().then((user) => {
      if (user.id) return;
      createProfile(currentUser.displayName); // create firestore path if the user is new signup
    });
  }, [currentUser.displayName]);

  const handleClick = (e, id) => {
    if (e.target.tagName === "BUTTON") return;
    navigate(id);
  };

  return (
    <div className="p-2 bg-[#202124] h-fit min-h-screen">
      <ProfileHeader />
      <main className="p-2 mt-16 text-white">
        <h1 className="text-center text-4xl tracking-wide">
          Welcome Back, {currentUser?.displayName}
        </h1>
        <hr className="mt-8 opacity-70" />
        <h2 className="my-6 text-2xl font-medium tracking-wide">Your Boards</h2>
        <ul className="flex gap-4 overflow-x-auto -[calc(100vh-175px)]">
          {boards.map(({ title, id, bg }) => (
            <li
              key={id}
              onClick={(e) => handleClick(e, id)}
              className={`bg-[${bg}] h-36 w-52 shrink-0 rounded-[4px] p-3 pl-4 cursor-pointer relative group shadow-md`}
            >
              <h3 className="text-2xl font-normal">
                <i>{title}</i>
              </h3>
              <div
                className="absolute right-3 bottom-3 group"
              >
                <button onClick={() => deleteBoard(id)} className="peer text-[14px] py-1 px-2 bg-white text-black rounded-sm translate-x-20 pointer-events-none duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto focus:!opacity-0">
                  delete
                </button>
              </div>
            </li>
          ))}
          <li>
            <Button
              clickFunc={() => setNewBoard(true)}
              className="h-36 w-52 rounded-md p-3 text-3xl bg-hover-clr shadow-inner shadow-grey-500"
            >
              <i className="fas fa-plus" />
            </Button>
          </li>
        </ul>
        {newBoard && <CreateNewBoard setNewBoard={setNewBoard} />}
      </main>
    </div>
  );
}

export default Profile;
