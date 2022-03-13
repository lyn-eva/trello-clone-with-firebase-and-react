import { useState, useEffect, memo } from "react";
import { useLocation } from "react-router";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

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

  // optimize
  const Lists = memo(() =>
    lists?.map((list, i) => (
      <List index={i} key={list.id} id={list.id} title={list.title} />
    ))
  );

  return (
    <div
      className={`relative p-[0.02px] bg-[${currentBoard.bg}] min-w-fit h-fit min-h-screen`}
    >
      <DragDropContext>
        <BoardHeader toggleSidebar={toggleSidebar} />
        <BoardSidebar on={sidebarOn} toggleSidebar={toggleSidebar} />
        <Droppable
          type="list"
          droppableId="list-container"
          direction="horizontal"
        >
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex gap-4"
            >
              {lists && <Lists listItems={lists} />}
              {provided.placeholder}
              <li>
                <Button
                  clickFunc={() => createList("new list")}
                  className="text-lg text-dense-blue pl-6 py-3 w-[20rem] text-left bg-list-clr duration-300 hover:bg-hover-clr hover:text-white rounded-md"
                >
                  <i className="fas fa-plus mr-2"></i> Add another list
                </Button>
              </li>
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Board;
