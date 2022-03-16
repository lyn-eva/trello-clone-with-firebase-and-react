import { useState, memo, useCallback } from "react";
import { createPortal } from "react-dom";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { useDB } from "../context/DbContext";

import ListHeader from "./ListHeader";
import Note from "./Note";
import ListFooter from "./ListFooter";
import ListDropDown from "./ListDropDown";
import Backdrop from "../modal/Backdrop";

function List({ id, title, index, notes }) {
  const [dropDownOn, setDropDownOn] = useState(false);

  console.log({notes})

  // optmize
  const Notes = memo(({ noteList }) =>
    noteList.map((note, i) => (
      <Note key={note.id} index={i} listId={id} noteId={note.id} noteTxt={note.title} />
    ))
  );

  console.log('list rerendered')
  return (
    <Draggable type="list" draggableId={id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="min-w-[20rem] w-64 border-2 border-orange-500"
        >
          <div className="relative bg-list-clr rounded-md p-2 shadow-sm">
            <ListHeader hdr={title} id={id} setDropDownOn={setDropDownOn} />
            {dropDownOn && (
              <>
                {createPortal(
                  <Backdrop onClick={() => setDropDownOn(false)} />,
                  document.getElementById("backdrop")
                )}
                <ListDropDown listId={id} />
              </>
            )}
            <Droppable droppableId={id} type="note">
              {(provided) =>  {
                return (
                <ul ref={provided.innerRef} {...provided.droppableProps}>
                  {notes && <Notes noteList={notes} />}
                  {provided.placeholder}
                </ul>
              )}}
            </Droppable>
            <ListFooter listId={id} noteOrder={notes?.length} />
          </div>
        </li>
      )}
    </Draggable>
  );
}
export default List;
// export default memo(List);
