import Button from "../utility/Button";
import DynamicTxt from "../utility/DynamicTxt";

function Note({ note, deleteNote }) {
  return (
    <li className="bg-white my-2 py-2 rounded-sm">
      <div className="text-[15px] relative group">
        <DynamicTxt className="px-2" initialName={note} />
        <Button
          clickFunc={deleteNote}
          className="bg-white absolute right-2 top-[2px] text-[18px] hidden group-hover:inline-block"
        >
          <i className="fas fa-times"></i>
        </Button>
      </div>
    </li>
  );
}

export default Note;
