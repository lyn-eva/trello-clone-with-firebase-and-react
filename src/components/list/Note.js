import { Draggable } from "react-beautiful-dnd";

import { useDB } from "../context/DbContext";

import Button from "../utility/Button";
import DynamicTxt from "../utility/DynamicTxt";

function Note({ noteTxt, listId, noteId, index }) {
  const { updateNote, deleteNote } = useDB();

  const updateNoteTitle = (newTitle) => {
    updateNote(listId, noteId, { title: newTitle });
  };
  
  return (
    <Draggable draggableId={noteId} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          className="bg-white mb-2 py-2 rounded-sm shadow-note"
        >
          <div className="text-[15px] relative group">
            <DynamicTxt
              updateFunc={updateNoteTitle}
              initialName={noteTxt}
              className="px-2"
            />
            <Button
              clickFunc={() => {
                deleteNote(listId, noteId);
              }}
              className="bg-white absolute right-3 top-[3px] text-[18px] hidden group-hover:inline-block"
            >
              <i className="fas fa-times"></i>
            </Button>
          </div>
        </li>
      )}
    </Draggable>
  );
}

export default Note;
