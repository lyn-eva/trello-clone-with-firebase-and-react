import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Button from "../utility/Button";

function BoardHeader({ toggleSidebar }) {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        navigate("../login", { replace: true });
      })
      .catch(() => {});
  };

  return (
    <header className="m-2 flex justify-between">
      <ul className="flex justify-end gap-4">
        <li>
          <Button
            clickFunc={toggleSidebar}
            className="text-white py-[5px] bg-[rgba(255,255,255,.2)] rounded-sm"
          >
            <i className="text-lg fas fa-ellipsis-h text-dense-blue mr-3 text-inherit"></i>
            Show menu
          </Button>
        </li>
      </ul>
      <div className="flex gap-4">
        <Button
          clickFunc={handleSignOut}
          className="py-[5px] bg-white tracking-wide rounded-md"
        >
          Sign up
        </Button>
        <Button
          clickFunc={handleSignOut}
          className="py-[5px] tracking-wide bg-white rounded-md"
        >
          Sign Out
        </Button>
        <div className="border-white w-10 grid place-items-center rounded-full bg-black h-full">
          <i className="fas fa-user-alt text-white"></i>
        </div>
      </div>
    </header>
  );
}

export default BoardHeader;
