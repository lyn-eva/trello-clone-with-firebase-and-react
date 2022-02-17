import { createPortal } from "react-dom";
import Backdrop from "../modal/Backdrop";

function BoardSidebar() {
  return (
    <>
      {createPortal(<Backdrop />, document.getElementById("backdrop"))}
      <aside className="absolute right-0 p-4 bg-white w-72 h-screen z-20">
        <ul>
          <li>change background</li>
        </ul>
      </aside>
    </>
  );
}

export default BoardSidebar;
