import { useState, useRef } from "react";
import Button from "../utility/Button";

function ListFtr({addTodb, listIdx}) {
  const [add, setAdd] = useState(false);
  const textAreaRef = useRef();

  const addNote = () => {
    setAdd(true);
    setTimeout(() => {
      textAreaRef.current.focus();
    }, 0);
  };

  const addNoteHandler = () => {
    const note = textAreaRef.current.value;
    setAdd(false);
    if (!note) return;
    addTodb(listIdx, note);
    textAreaRef.current.value = '';
  }

  return (
    <footer className="relative">
      <button
        onClick={addNote}
        className={`${add ? "hidden" : "block"} text-left w-full`}
      >
        <i className="fas fa-plus pr-2"></i>
        Add a card
      </button>
      <div className={`${add ? "block" : "hidden"}`}>
        <textarea
          ref={textAreaRef}
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

export default ListFtr;
