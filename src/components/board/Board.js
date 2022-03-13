import { useState, useEffect, memo, useMemo } from "react";
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
  const { lists, updateList, reqBoardDetails, createList, currentBoard } =
    useDB();
  const { currentUser } = useAuth();

  const [localLists, setLocalLists] = useState(lists); // for smoother UX
  useEffect(() => setLocalLists([...lists]), [lists]);

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
    localLists.map((list, i) => {
      return (
        <List
          index={i}
          key={list.id}
          id={list.id}
          title={list.title}
          notes={list.notes}
        />
      );
    })
  );

  const onDragEnd = ({ destination: target, source, draggableId, type }) => {
    if (
      target === null ||
      (source.index === target.index &&
        source.droppableId === target.droppableId)
    )
      return;

    switch (type) {
      case "list":
        const draggedItem = localLists[source.index];
        localLists.splice(source.index, 1);
        localLists.splice(target.index, 0, draggedItem)
        setLocalLists([...localLists]);
        localLists.forEach(({id}, index) => {
          updateList(id, {order: index})
        })
        break;

      default:
        console.log("default");
    }
  };


  return (
    <div
      className={`relative p-[0.02px] bg-[${currentBoard.bg}] min-w-fit h-fit min-h-screen`}
    >
      <DragDropContext onDragEnd={onDragEnd}>
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
              {localLists.length && <Lists />}
              {provided.placeholder}
              <li>
                <Button
                  clickFunc={() =>
                    createList("new list", Object.keys(lists).length)
                  }
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
