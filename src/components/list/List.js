import ListHdr from "./ListHdr";
import Note from "./Note";
import ListFtr from "./ListFtr";

function List({ data, addTodb, listIdx }) {
  return (
    <li className="w-64">
      <div className="bg-list-clr rounded-md p-2 shadow-sm">
        <ListHdr hdr={data.name} />
        <ul>
          {data.notes.map((note) => (
            <Note key={note.txt}>{note.txt}</Note>
          ))}
        </ul>
        <ListFtr listIdx={listIdx} addTodb={addTodb}/>
      </div>
    </li>
  );
}

export default List;
