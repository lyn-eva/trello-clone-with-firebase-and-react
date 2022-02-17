import ListHeader from "./ListHeader";
import Note from "./Note";
import ListFooter from "./ListFooter";

function List({ data, addTodb, listIdx }) {
  return (
    <li className="w-64">
      <div className="bg-list-clr rounded-md p-2 shadow-sm">
        <ListHeader hdr={data.name} />
        <ul>
          {data.notes.map((note) => (
            <Note key={note.txt}>{note.txt}</Note>
          ))}
        </ul>
        <ListFooter listIdx={listIdx} addTodb={addTodb}/>
      </div>
    </li>
  );
}

export default List;
