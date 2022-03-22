import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Button from "../utility/Button";

function BoardHeader({ toggleSidebar }) {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("../signup");
  };

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        navigate("../login", { replace: true });
      })
      .catch(() => {});
  };

  return (
    <header className="m-2 flex justify-between relative">
      <ul className="flex justify-end gap-4">
        {/* <li>
          <Button
            clickFunc={toggleSidebar}
            className="text-white py-[5px] bg-[rgba(255,255,255,.2)] rounded-sm"
          >
            <i className="text-lg fas fa-ellipsis-h text-dense-blue mr-3 text-inherit"></i>
            Show menu
          </Button>
        </li> */}
      </ul>
      <nav className="gap-4">
        <ul className='absolute bg-black rounded-md w-[calc(100%+2rem)] -left-4 top-12 text-center text-white'>
          <li className='py-2 border-b-[1px] border-[rgba(255,255,255,.4)]'>
            Sign Up
            {/* <Button
              clickFunc={handleSignUp}
              className="py-[5px] bg-white tracking-wide rounded-md"
            >
              Sign up
            </Button> */}
          </li>
          <li className='py-2'>
            {/* <Button
              clickFunc={handleSignOut}
              className="py-[5px] tracking-wide bg-white rounded-md"
            >
              Sign Out
            </Button> */}
            Sign Out
          </li>
        </ul>
        <div className="border-white min-w-10 w-10 h-10 grid place-items-center rounded-full bg-black">
          <i className="fas fa-user-alt text-white"></i>
        </div>
      </nav>
    </header>
  );
}

export default BoardHeader;
