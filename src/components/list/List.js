import { useState } from "react";
import { createPortal } from "react-dom";

import { useDB } from "../context/DbContext";

import ListHeader from "./ListHeader";
import Note from "./Note";
import ListFooter from "./ListFooter";
import ListDropDown from "./ListDropDown";
import Backdrop from "../modal/Backdrop";

function List({ data, addNote, deleteNote }) {
  const [dropDownOn, setDropDownOn] = useState(false);
  const { notes } = useDB();

  return (
    <li className="min-w-[20rem] w-64 border-2 border-orange-500">
      <div className="relative bg-list-clr rounded-md p-2 shadow-sm">
        <ListHeader hdr={data.title} id={data.id} setDropDownOn={setDropDownOn} />
        {dropDownOn && (
          <>
            {createPortal(
              <Backdrop onClick={() => setDropDownOn(false)} />,
              document.getElementById("backdrop")
            )}
            <ListDropDown listId={data.id}/>
          </>
        )}
        <ul>
          {notes[data.id]?.map((note, i) => (
          <Note
              key={note.id}
              note={note.title}
              // deleteNote={() => deleteNote(listIdx, i)}
            />
          ))}
        </ul>
        <ListFooter listIdx={data.id} addNote={addNote} />
      </div>
    </li>
  );
}

export default List;
