import { useState } from "react";
import { createPortal } from "react-dom";

import { useDB } from "../context/DbContext";

import ListHeader from "./ListHeader";
import Note from "./Note";
import ListFooter from "./ListFooter";
import ListDropDown from "./ListDropDown";
import Backdrop from "../modal/Backdrop";

function List({ data, index, addNote, deleteNote }) {
  const [dropDownOn, setDropDownOn] = useState(false);
  const { notes } = useDB();
  const noteItems = Object.keys(notes).map(id => notes[id]);
  console.log('notes',noteItems);

  return (
    <li className="min-w-[20rem] w-64 border-2 border-orange-500">
      <div className="relative bg-list-clr rounded-md p-2 shadow-sm">
        <ListHeader hdr={data.title} setDropDownOn={setDropDownOn} />
        {dropDownOn && (
          <>
            {createPortal(
              <Backdrop onClick={() => setDropDownOn(false)} />,
              document.getElementById("backdrop")
            )}
            <ListDropDown />
          </>
        )}
        <ul>
          {noteItems[index]?.map((note, i) => (
          <Note
              key={note.id}
              note={note.txt}
              // deleteNote={() => deleteNote(listIdx, i)}
            />
          ))}
        </ul>
        <ListFooter listIdx={index} addNote={addNote} />
      </div>
    </li>
  );
}

export default List;
