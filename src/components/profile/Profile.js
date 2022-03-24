import { useState } from "react";
import { getAuth } from "@firebase/auth";
import { useNavigate } from "react-router";

import ProfileHeader from "./ProfileHeader";
import { useDB } from "../context/DbContext";
import Button from "../utility/Button";
import CreateNewBoard from "./CreateNewBoard";
import DeleteExistingBoard from "./DeleteExistingBoard";
import LoadingCircle from "../utility/LoadingCircle";
import UserInfo from "./UserInfo";

function Profile() {
  const { boards } = useDB();
  const { currentUser } = getAuth();
  const [addBoard, setAddBoard] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [deleteBOARD, setDeleteBOARD] = useState({});

  const navigate = useNavigate();

  const handleClick = (e, id) => {
    if (e.target.tagName === "BUTTON") return;
    navigate(id);
  };

  return (
    <div className="flex flex-col p-2 pb-0 bg-clr-dark h-fit min-h-screen">
      <ProfileHeader setShowInfo={setShowInfo}/>
      <main className="flex flex-col grow p-2 mt-4 mb-4 sm:mt-12 text-white">
        {showInfo && <UserInfo/>}
        <h1 className="text-center text-sm-lg sm:text-4xl tracking-wide">
          Welcome Back, {currentUser?.displayName}
        </h1>
        <hr className="mt-8 opacity-70" />
        <h2 className="my-6 text-sm-md sm:text-2xl font-medium tracking-wide">
          Your Boards
        </h2>
        <ul className="flex grow gap-4 overflow-x-auto relative">
          {!boards.length && <LoadingCircle msg="loading your boards" />}
          {!!boards.length &&
            boards.map(({ title, id, bg }) => (
              <li
                key={id}
                onClick={(e) => handleClick(e, id)}
                className={`bg-[${bg}] h-36 w-52 shrink-0 rounded-[4px] p-3 pl-4 cursor-pointer relative group shadow-md`}
              >
                <h3 className="text-sm-md sm:text-2xl font-normal">
                  <i>{title}</i>
                </h3>
                <div className="absolute right-3 bottom-3 group">
                  <button
                    onClick={() => setDeleteBOARD({ delete: true, id, title })}
                    className="peer text-[14px] py-1 px-2 bg-white text-black rounded-sm translate-x-20 pointer-events-none duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto focus:!opacity-0"
                  >
                    delete
                  </button>
                </div>
              </li>
            ))}
          <li>
            <Button
              clickFunc={() => setAddBoard(true)}
              className="h-36 w-52 rounded-md p-3 text-3xl bg-hover-clr shadow-inner shadow-grey-500"
            >
              <i className="fas fa-plus" />
            </Button>
          </li>
        </ul>
        {addBoard && <CreateNewBoard setNewBoard={setAddBoard} />}
        {deleteBOARD.delete && (
          <DeleteExistingBoard
            setDeleteBOARD={setDeleteBOARD}
            id={deleteBOARD.id}
            title={deleteBOARD.title}
          />
        )}
      </main>
    </div>
  );
}

export default Profile;
