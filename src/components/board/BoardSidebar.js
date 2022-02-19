import { createPortal } from "react-dom";
import Backdrop from "../modal/Backdrop";
import Button from "../utility/Button";
import { useTrello } from "../context/Context";

function BoardSidebar({ on, toggleSidebar }) {
  const { BG_THEME, setBg } = useTrello();

  return (
    <>
      {on &&
        createPortal(
          <Backdrop onClick={toggleSidebar} />,
          document.getElementById("backdrop")
        )}
      <aside
        className={`text-center fixed ${
          on ? "translate-x-0" : "translate-x-full"
        } duration-300 top-0 right-0 p-5 w-full bg-white sm:w-[22rem] h-screen z-20 py-10`}
      >
        <Button clickFunc={toggleSidebar} className="absolute right-4 top-4">
          <i className="fas fa-times text-xl"></i>
        </Button>
        <h3 className="text-dense-blue pb-3 text-lg border-b-[1px] font-medium">
          Menu
        </h3>
        <div className="py-3 text-grey-blue mt-2">
          <h4>
            <span
              style={{ background: BG_THEME }}
              className="bg-orange-400 w-5 h-5 inline-block mr-3 -mb-1 rounded-md"
            ></span>
            Change background
          </h4>
          <ul className="flex gap-3 flex-wrap mt-4">
            <li
              onClick={() => setBg("#d29034")}
              className="color-option bg-[#d29034]"
            ></li>
            <li
              onClick={() => setBg("#4bbf6b")}
              className="color-option bg-[#4bbf6b]"
            ></li>
            <li
              onClick={() => setBg("#cd5a91")}
              className="color-option bg-[#cd5a91]"
            ></li>
            <li
              onClick={() => setBg("#0079bf")}
              className="color-option bg-[#0079bf]"
            ></li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default BoardSidebar;
