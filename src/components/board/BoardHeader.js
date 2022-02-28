import React from "react";
import Button from "../utility/Button";

function BoardHeader({ toggleSidebar }) {
  return (
    <header className="m-2 bkg-amber-100">
      <ul className="flex justify-end gap-4">
        <li>
          <Button
            clickFunc={toggleSidebar}
            className="text-white py-[5px] bg-[rgba(255,255,255,.2)] rounded-md"
          >
            <i className="text-lg fas fa-ellipsis-h text-dense-blue mr-3 text-inherit"></i>
            Filter
          </Button>
        </li>
        <li>
          <Button
            clickFunc={toggleSidebar}
            className="text-white py-[5px] bg-[rgba(255,255,255,.2)] rounded-s"
          >
            <i className="text-lg fas fa-ellipsis-h text-dense-blue mr-3 text-inherit"></i>
            Show menu
          </Button>
        </li>
      </ul>
    </header>
  );
}

export default BoardHeader;
