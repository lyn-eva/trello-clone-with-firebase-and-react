import { useState, useRef } from "react";

import { useDB } from "../context/DbContext";

import Button from "../utility/Button";

function ListFooter({ listId, noteOrder }) {
  const [add, setAdd] = useState(false);
  const txtAreaRef = useRef();

  const { createNote } = useDB();

  const addNoteStart = () => {
    setAdd(true);
    setTimeout(() => {
      txtAreaRef.current.focus();
    }, 0);
  };

  const addNoteEnd = () => {
    setAdd(false);
    const note = txtAreaRef.current.value;
    if (!note) return;
    createNote(listId, noteOrder, note);
    txtAreaRef.current.value = "";
  };

  return (
    <footer className="mt-3">
      <button
        onClick={addNoteStart}
        className={`${
          add ? "hidden" : "block"
        } text-left w-full px-2 py-2 hover:bg-hover-clr hover:rounded-md`}
      >
        <i className="fas fa-plus pr-2"></i>
        Add a card
      </button>
      <div className={`${add ? "block" : "hidden"}`}>
        <textarea
          ref={txtAreaRef}
          col="20"
          placeholder="Enter the title of this card"
          className="w-full rounded-sm p-2 h-16 border-2 box-border resize-none"
        />
        <div className="border-2 p-[1px] flex items-center -mt-1">
          <Button
            clickFunc={addNoteEnd}
            className="bg-primary mr-2 text-white py-[5px]"
          >
            Add card
          </Button>
          <Button clickFunc={() => setAdd(false)}>
            <i className="fas fa-times text-black text-2xl"></i>
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default ListFooter;
