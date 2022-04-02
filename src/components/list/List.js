import { useState, memo } from "react";
import { createPortal } from "react-dom";
import { Droppable, Draggable } from "react-beautiful-dnd";

import ListHeader from "./ListHeader";
import Note from "./Note";
import ListFooter from "./ListFooter";
import ListDropDown from "./ListDropDown";
import Backdrop from "../modal/Backdrop";

function List({ id, title, index, notes }) {
  const [dropDownOn, setDropDownOn] = useState(false);

  // optmize
  const Notes = memo(({ noteList }) =>
    noteList.map((note, i) => (
      <Note key={note.id} index={i} listId={id} noteId={note.id} noteTxt={note.title} />
    ))
  );

  return (
    <Draggable type="list" draggableId={id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mr-4 min-w-[20rem] w-64 h-fit"
        >
          <div className="relative p-2 duration bg-list-clr rounded-md shadow-sm">
            <ListHeader hdr={title} id={id} setDropDownOn={setDropDownOn} />
            {dropDownOn && (
              <>
                {/* {createPortal(
                  <Backdrop onClick={() => setDropDownOn(false)} />,
                  document.getElementById("backdrop")
                )} */}
                <ListDropDown setDropDownOn={setDropDownOn} listId={id} />
              </>
            )}
            <Droppable droppableId={id} type="note">
              {(provided, snapShot) => (
                <ul
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-h-[1rem] ${
                    snapShot.isDraggingOver ? "bg-gray-300" : ""
                  }`}
                >
                  {notes && <Notes noteList={notes} />}
                  {provided.placeholder}
                </ul>
              )} 
            </Droppable>
            <ListFooter listId={id} noteOrder={notes?.length} />
          </div>
        </li>
      )}
    </Draggable>
  );
}
export default List;
