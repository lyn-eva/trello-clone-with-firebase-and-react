import { useState, memo, useEffect } from "react";
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

  // console.log(id, "re-rendered");

  // optmize
  const Notes = memo(
    ({ noteList }) =>
      noteList.map((note, i) => (
        <Draggable draggableId={note.id} index={i} key={note.id}>
          {(provided) => (
            <Note
              innerRef={provided.innerRef}
              dragHandleProps={provided.dragHandleProps}
              draggableProps={provided.draggableProps}
              listId={id}
              noteId={note.id}
              note={note.title}
            />
          )}
        </Draggable>
      )),
    (prevProps, nextProps) => prevProps.noteList === nextProps.noteList
  );

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
              {(provided) => (
                <ul index={index} ref={provided.innerRef} {...provided.droppableProps}>
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
// export default List;
export default memo(List, (prevProps, nextProps) => true);
