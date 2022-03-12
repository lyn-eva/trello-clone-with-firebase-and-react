import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { DragDropContext } from "react-beautiful-dnd";

import BoardHeader from "./BoardHeader";
import BoardSidebar from "./BoardSidebar";
import List from "../list/List";
import Button from "../utility/Button";
import { useDB } from "../context/DbContext";
import { useAuth } from "../context/AuthContext";

function Board() {
  const [sidebarOn, setSidebarOn] = useState(false);
  const { lists, reqBoardDetails, createList, currentBoard } = useDB();
  const { currentUser } = useAuth();

  // console.log("board re-rendered");

  const path = useLocation();
  useEffect(() => {
    if (!currentUser) return;
    reqBoardDetails(path.pathname.match(/\w+$/gi)[0]);
    return () => {};
  }, [currentUser]);

  const toggleSidebar = () => {
    setSidebarOn((prevState) => !prevState);
  };

  return (
    <div
      className={`relative p-[0.02px] bg-[${currentBoard.bg}] min-w-fit h-fit min-h-screen`}
    >
      <DragDropContext>
        <BoardHeader toggleSidebar={toggleSidebar} />
        <BoardSidebar on={sidebarOn} toggleSidebar={toggleSidebar} />
        <ul className="flex gap-2 m-2 h-[calc(100%-54px)]">
          {lists?.map((list, i) => (
            <List
              index={i}
              key={list.id}
              id={list.id}
              title={list.title}
            />
          ))}
          <li>
            <Button
              clickFunc={() => createList("new list")}
              className="text-lg text-dense-blue pl-6 py-3 w-[20rem] text-left bg-list-clr duration-300 hover:bg-hover-clr hover:text-white rounded-md"
            >
              <i className="fas fa-plus mr-2"></i> Add another list
            </Button>
          </li>
        </ul>
      </DragDropContext>
    </div>
  );
}

export default Board;
