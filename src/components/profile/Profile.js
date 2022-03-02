import { useState, useEffect } from "react";
import { getAuth } from "@firebase/auth";
import ProfileHeader from "./ProfileHeader";
import { useDB } from "../context/DbContext";
import Button from "../utility/Button";
import CreateNewBoard from "./CreateNewBoard";

function Profile() {
  const { createProfile, getDocuments } = useDB();
  const { currentUser } = getAuth();
  const [newBoard, setNewBoard] = useState(false);

  useEffect(() => {
    getDocuments().then((users) => {
      const userdocs = users.docs.map((doc) => doc.id);
      if (userdocs?.indexOf(currentUser.displayName) === -1) {
        // create firestore path if the user is new signup
        createProfile(currentUser.displayName);
      }
    });
  }, []);

  const handleClick = () => {};

  return (
    <div className="p-2 bg-[#0079bf] h-screen">
      <ProfileHeader />
      <main className="mt-8 text-white">
        <h2>{currentUser.displayName}</h2>
        <h1 className="mb-4 text-2xl">Your Boards</h1>
        <ul className="grid grid-rows-3 grid-cols-4 gap-4">
          <div className="bg-orange-300 h-40 w-full rounded-md p-3">
            <h3 className="font-medium text-2xl">Board 1</h3>
          </div>
          {/* <div className="bg-red-300 h-40 w-full rounded-md p-3">
            <h3 className="font-medium text-2xl">Board 1</h3>
          </div>
          <div className="bg-green-300 h-40 w-full rounded-md p-3">
            <h3 className="font-medium text-2xl">Board 1</h3>
          </div> */}
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
