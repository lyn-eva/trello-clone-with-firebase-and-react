import { useState, useRef } from "react";
import Button from "../utility/Button";

function ListFooter({addTodb, listIdx}) {
  const [add, setAdd] = useState(false);
  const txtAreaRef = useRef();

  const addNote = () => {
    setAdd(true);
    setTimeout(() => {
      txtAreaRef.current.focus();
    }, 0);
  };

  const addNoteHandler = () => {
    const note = txtAreaRef.current.value;
    setAdd(false);
    if (!note) return;
    addTodb(listIdx, note);
    txtAreaRef.current.value = '';
  }

  return (
    <footer className="mt-3">
      <button
        onClick={addNote}
        className={`${add ? "hidden" : "block"} text-left w-full`}
      >
        <i className="fas fa-plus pr-2"></i>
        Add a card
      </button>
      <div className={`${add ? "block" : "hidden"}`}>
        <textarea
          ref={txtAreaRef}
          col="20"
          placeholder="Enter the title of this card"
          className="w-full rounded-sm p-1 h-16 border-2 box-border resize-none"
        />
        <div className="border-2 p-[1px] flex items-center -mt-2">
          <Button clickFunc={addNoteHandler} className="bg-primary mr-2">Add card</Button>
          <Button clickFunc={() => setAdd(false)}>
            <i className="fas fa-times text-black text-2xl"></i>
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default ListFooter;
