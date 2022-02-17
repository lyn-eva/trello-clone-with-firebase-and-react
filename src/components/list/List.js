import ListHeader from "./ListHeader";
import Note from "./Note";
import ListFooter from "./ListFooter";

function List({ data, listIdx, addNote, deleteNote }) {

  return (
    <li className="min-w-[16rem] w-64 border-2">
      <div className="bg-list-clr rounded-md p-2 shadow-sm">
        <ListHeader hdr={data.name} />
        <ul>
          {data.notes.map((note, i) => (
            <Note key={note.txt} note={note.txt} deleteNote={() => deleteNote(listIdx, i)}/>
          ))}
        </ul>
        <ListFooter listIdx={listIdx} addNote={addNote}/>
      </div>
    </li>
  );
}

export default List;
