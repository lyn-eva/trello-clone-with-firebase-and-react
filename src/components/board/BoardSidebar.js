import { createPortal } from "react-dom";
import Backdrop from "../modal/Backdrop";
import Button from "../utility/Button";

function BoardSidebar({ on, toggleSidebar }) {
  return (
    <aside
      className={`fixed translate-x-${
        on ? "0" : "full" 
      } duration-300 top-0 right-0 p-4 bg-white w-72 h-screen z-20 py-8`}
    >
      <Button clickFunc={toggleSidebar} className="absolute right-4 top-4">
        <i className="fas fa-times text-xl"></i>
      </Button>
      {on && createPortal(<Backdrop onClick={toggleSidebar}/>, document.getElementById("backdrop"))}
      <ul>
        <li>change background</li>
      </ul>
    </aside>
  );
}

export default BoardSidebar;
