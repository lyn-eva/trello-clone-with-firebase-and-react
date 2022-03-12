import { useState } from "react";
import { createPortal } from "react-dom";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { useDB } from "../context/DbContext";

import ListHeader from "./ListHeader";
import Note from "./Note";
import ListFooter from "./ListFooter";
import ListDropDown from "./ListDropDown";
import Backdrop from "../modal/Backdrop";

function List({ id, title, index }) {
  const [dropDownOn, setDropDownOn] = useState(false);
  const { notes } = useDB();

  return (
    <li className="min-w-[20rem] w-64 border-2 border-orange-500">
      <div className="relative bg-list-clr rounded-md p-2 shadow-sm">
        <ListHeader
          hdr={title}
          id={id}
          setDropDownOn={setDropDownOn}
        />
        {dropDownOn && (
          <>
            {createPortal(
              <Backdrop onClick={() => setDropDownOn(false)} />,
              document.getElementById("backdrop")
            )}
            <ListDropDown listId={id} />
          </>
        )}
        <Droppable droppableId={id}>
          {(provided) => (
            <ul index={index} ref={provided.innerRef} {...provided.droppableProps}>
              {notes[id]?.map((note, i) => (
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
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
        <ListFooter listId={id} />
      </div>
    </li>
  );
}

export default List;
