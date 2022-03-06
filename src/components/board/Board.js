import { useState, useEffect } from "react";
import { useLocation } from "react-router";

import BoardHeader from "./BoardHeader";
import BoardSidebar from "./BoardSidebar";
import List from "../list/List";
import Button from "../utility/Button";
import { useDB } from "../context/DbContext";
import { useAuth } from "../context/AuthContext";

function Board() {
  const [sidebarOn, setSidebarOn] = useState(false);
  const { lists, reqBoardDetails, createList } = useDB();
  const { currentUsername } = useAuth();

  const path = useLocation();
  useEffect(() => {
    if (!currentUsername) return;
    reqBoardDetails(path.pathname.match(/\w+$/gi)[0]);
  }, [currentUsername]);

  const toggleSidebar = () => {
    setSidebarOn((prevState) => !prevState);
  };

  return (
    <div className="relative p-[0.02px] bg-orange-400 min-w-fit h-fit min-h-screen">
      <BoardHeader toggleSidebar={toggleSidebar} />
      <BoardSidebar on={sidebarOn} toggleSidebar={toggleSidebar} />
      {/* <div> */}
      <ul className="flex gap-2 m-2 h-[calc(100%-54px)]">
        {lists?.map((list, i) => (
          <List key={list.id} data={list} index={i} />
        ))}
        <li>
          <Button clickFunc={() => createList("new list")} className="text-lg text-dense-blue pl-6 py-3 w-[20rem] text-left bg-list-clr duration-300 hover:bg-hover-clr hover:text-white rounded-md">
            <i className="fas fa-plus mr-2"></i> Add another list
          </Button>
        </li>
      </ul>
      {/* </div> */}
    </div>
  );
}

export default Board;
