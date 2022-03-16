import { useState, useEffect, memo, useMemo, useCallback } from "react";
import { useLocation } from "react-router";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import BoardHeader from "./BoardHeader";
import BoardSidebar from "./BoardSidebar";
import Lists from "../list/Lists";
import Button from "../utility/Button";
import { useDB } from "../context/DbContext";
import { useAuth } from "../context/AuthContext";

function Board() {
  const [sidebarOn, setSidebarOn] = useState(false);
  const {
    lists,
    reqBoardDetails,
    createList,
    currentBoard,
    noteDndForSameList,
    noteDndAmongDiffLists,
    listDndOperation,
  } = useDB();
  const { currentUser } = useAuth();

  const [localLists, setLocalLists] = useState([]); // for smoother UX
  const [localNotes, setLocalNotes] = useState({});

  useEffect(() => {
    setLocalLists(Object.values(lists));
    setLocalNotes(
      Object.values(lists).reduce(
        (total, list) => (total = { ...total, [list.id]: list.notes }),
        {}
      )
    );
    console.log("values recomputed");
  }, [lists]);

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


  const onDragEnd = ({ destination: target, source, type, draggableId }) => {
    if (
      target === null ||
      (source.index === target.index && source.droppableId === target.droppableId)
    )
      return;

    switch (type) {
      case "list":
        const draggedList = localLists[source.index];
        localLists.splice(source.index, 1);
        localLists.splice(target.index, 0, draggedList);
        // setLocalLists([...localLists]);
        listDndOperation(localLists);
        break;

      case "note":
        const sourceList = localNotes[source.droppableId];
        const draggedNote = sourceList[source.index];
        if (source.droppableId === target.droppableId) {
          sourceList.splice(source.index, 1);
          sourceList.splice(target.index, 0, draggedNote);
          setLocalNotes((prevState) => ({
            ...prevState,
            [source.droppableId]: sourceList,
          }));
          noteDndForSameList(source.droppableId, sourceList);
          break;
        } else {
          // dnd between different Lists
          const targetList = localNotes[target.droppableId];
          sourceList.splice(source.index, 1);
          targetList.splice(target.index, 0, draggedNote);
          setLocalNotes((prevState) => ({
            ...prevState,
            [source.droppableId]: sourceList,
            [target.droppableId]: targetList,
          }));
          noteDndAmongDiffLists(draggedNote, source, target, sourceList, targetList);
          break;
        }

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
        <Droppable type="list" droppableId="list-container" direction="horizontal">
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex gap-4"
            >
              {localLists.length && <Lists lists={localLists} notes={localNotes}/>}
              {provided.placeholder}
              <li>
                <Button
                  clickFunc={() => createList("new list", localLists.length)}
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
