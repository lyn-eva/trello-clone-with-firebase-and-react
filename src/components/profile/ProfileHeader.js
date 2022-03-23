import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Button from "../utility/Button";

function BoardHeader({ setShowInfo }) {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("../signup");
  };

  const handleSignOut = () => {
    console.log("in");
    signOutUser()
      .then(() => {
        navigate("../login", { replace: true });
      })
      .catch(() => {});
  };

  return (
    <header className="m-2 flex justify-between sm:justify-end gap-4 relative">
      <nav className="flex gap-4 group sm:w-auto items-center justify-between">
        <button className="sm:hidden">
          <i className="fa-solid fa-bars block text-white text-2xl"></i>
        </button>
        <ul className="opacity-0 scale-y-0 sm:opacity-100 sm:scale-y-100 origin-top md:gap-4 group-focus-within:scale-y-100 duration-300 group-focus-within:opacity-100 absolute sm:static sm:w-auto sm:flex sm:items-center sm:gap-3 sm:bg-transparent sm:shadow-none sm:text-black shadow-md bg-[#28292c] rounded-md w-[calc(100%+2rem)] -left-4 top-12 text-center text-white">
          <li
            onClick={handleSignUp}
            className="sm:py-1 sm:px-2 sm:border-none sm:bg-white tracking-wide sm:rounded-md py-2 border-b-[1px] border-[rgba(255,255,255,.4)]"
          >
            Sign Up
            {/* <Button
              clickFunc={handleSignUp}
              className="py-[5px] bg-white tracking-wide rounded-md"
            >
              Sign up
            </Button> */}
          </li>
          <li
            onClick={handleSignOut}
            className="py-2 sm:py-1 sm:bg-white sm:px-2 sm:rounded-md"
          >
            {/* <Button
              clickFunc={handleSignOut}
              className="py-[5px] tracking-wide bg-white rounded-md"
            >
              Sign Out
            </Button> */}
            Sign Out
          </li>
        </ul>
      </nav>
      <button
        onClick={() => setShowInfo((prev) => !prev)}
        className="border-white min-w-10 w-10 h-10 grid place-items-center rounded-full bg-black"
      >
        <i className="fas fa-user-alt text-white"></i>
      </button>
    </header>
  );
}

export default BoardHeader;
