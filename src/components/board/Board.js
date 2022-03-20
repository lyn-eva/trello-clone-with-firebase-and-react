import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import BoardHeader from "./BoardHeader";
import BoardSidebar from "./BoardSidebar";
import Button from "../utility/Button";
import { useDB } from "../context/DbContext";
import { useAuth } from "../context/AuthContext";
import List from "../list/List";

function Board() {
  const [sidebarOn, setSidebarOn] = useState(false);
  const {
    lists,
    notes,
    reqBoardDetails,
    createList,
    currentBoard,
    updateNoteOrder,
    updateNotesOrder,
    updateListOrder,
  } = useDB();
  const { currentUser } = useAuth();

  const [localLists, setLocalLists] = useState([]); // for smoother UX
  const [localNotes, setLocalNotes] = useState({});

  useEffect(() => {
    setLocalLists(Object.values(lists));
  }, [lists]);

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  const path = useLocation();
  useEffect(() => {
    if (!currentUser) return;
    reqBoardDetails(path.pathname.match(/\w+$/gi)[0]);
  }, [currentUser, path.pathname]);

  const toggleSidebar = () => {
    setSidebarOn((prevState) => !prevState);
  };

  function Lists({ lists, notes }) {
    return lists.map(({ id, title }, i) => {
      return <List index={i} key={id} id={id} title={title} notes={notes[id]} />;
    });
  }

  const onDragEnd = ({ destination: target, source, type }) => {
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
        setLocalLists([...localLists]);
        updateListOrder(localLists.map(list => list.id));
        break;

      case "note":
        const sourceList = localNotes[source.droppableId];
        const draggedNote = sourceList[source.index];
        // dnd at the same list
        if (source.droppableId === target.droppableId) {
          sourceList.splice(source.index, 1);
          sourceList.splice(target.index, 0, draggedNote);
          setLocalNotes((prevState) => ({
            ...prevState,
            [source.droppableId]: sourceList,
          }));
          updateNoteOrder(source.droppableId, sourceList);
          break;
        }
        // dnd between different Lists
        else {
          const targetList = localNotes[target.droppableId];
          sourceList.splice(source.index, 1);
          targetList.splice(target.index, 0, draggedNote);
          setLocalNotes((prevState) => ({
            ...prevState,
            [source.droppableId]: sourceList,
            [target.droppableId]: targetList,
          }));
          updateNotesOrder(draggedNote, source, target, sourceList, targetList);
          break;
        }

      default:
        console.log("default");
    }
  };

  return (
    <>
      {currentBoard && (
        <div
          className={`relative p-[0.02px] bg-[${currentBoard.bg}] h-fit min-h-screen flex flex-col`}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            <BoardHeader toggleSidebar={toggleSidebar} />
            <BoardSidebar on={sidebarOn} toggleSidebar={toggleSidebar} />
            <Droppable type="list" droppableId="list-container" direction="horizontal">
              {(provided) => (
                <ul
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex px-2 overflow-x-auto grow"
                >
                  {localLists !== [] && <Lists lists={localLists} notes={localNotes} />}
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
      )}
    </>
  );
}

export default Board;
