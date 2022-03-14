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
  const { lists, updateList, updateNote, createNote, deleteNote, addNoteToExistingList, reqBoardDetails, createList, currentBoard } =
    useDB();
  const { currentUser } = useAuth();

  const [localLists, setLocalLists] = useState(lists); // for smoother UX
  const [localNotes, setLocalNotes] = useState();
  // console.log(localNotes);

  useEffect(() => {
    setLocalLists(Object.values(lists));
    setLocalNotes(
      Object.values(lists).reduce(
        (total, list) => (total = { ...total, [list.id]: list.notes }),
        {}
      )
    );
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
  const Lists = memo(() =>
    localLists.map((list, i) => {
      return (
        <List
          index={i}
          key={list.id}
          id={list.id}
          title={list.title}
          notes={localNotes[list.id]}
        />
      );
    })
  );

  const onDragEnd = ({ destination: target, source, type, draggableId }) => {
    // console.log(res)
    if (target === null || (source.index === target.index && source.droppableId === target.droppableId)) return;

    switch (type) {
      case "list":
        const draggedList = localLists[source.index];
        localLists.splice(source.index, 1);
        localLists.splice(target.index, 0, draggedList);
        setLocalLists([...localLists]);
        localLists.forEach(({ id }, index) => {
          updateList(id, { order: index });
        });
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
          sourceList.forEach(({ id }, index) => {
            updateNote(target.droppableId, id, { order: index });
          });
          break;
        }
        else { // dnd between different Lists
          const targetList = localNotes[target.droppableId];
          sourceList.splice(source.index, 1);
          targetList.splice(target.index, 0, draggedNote);
          setLocalNotes((prevState) => ({
            ...prevState,
            [source.droppableId]: sourceList,
            [target.droppableId]: targetList,
          }));
          deleteNote(source.droppableId, draggableId);
          addNoteToExistingList(target.droppableId, draggableId, target.index, draggedNote.title);
          targetList.forEach(({ id }, index) => {
            updateNote(target.droppableId, id, { order: index });
          });
          sourceList.forEach(({ id }, index) => {
            updateNote(source.droppableId, id, { order: index });
          });
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
              {localLists.length && <Lists />}
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
