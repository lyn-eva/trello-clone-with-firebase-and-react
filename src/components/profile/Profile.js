import ProfileHeader from "./ProfileHeader";
import { useTrello } from "../context/Context";

function Profile() {

  return (
    <div className="p-2 bg-[#0079bf] h-screen">
      <ProfileHeader />
      <main className="mt-8 flex justify-between gap-4 text-white">
        <div className="bg-orange-300 h-40 w-full rounded-md p-3">
          <h3 className="font-medium text-2xl">Board 1</h3>
        </div>
        <div className="bg-red-300 h-40 w-full rounded-md p-3">
          <h3 className="font-medium text-2xl">Board 1</h3>
        </div>
        <div className="bg-green-300 h-40 w-full rounded-md p-3">
          <h3 className="font-medium text-2xl">Board 1</h3>
        </div>
      </main>
    </div>
  );
}

export default Profile;
