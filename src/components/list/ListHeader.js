import { useDB } from "../context/DbContext";
import Button from "../utility/Button";
import DynamicTxt from "../utility/DynamicTxt";

function ListHeader({ hdr, id, setDropDownOn }) {
  const { updateList } = useDB();
  const updateListTitle = (newTitle) => {
    updateList(id, {title: newTitle});
  }

  return (
    <header className="flex justify-between items-center pr-1 text-dense-blue pb-2">
      <DynamicTxt updateFunc={updateListTitle} className="text-[1.2rem] font-medium py-1" initialName={hdr} />
      <Button
        clickFunc={() => setDropDownOn(true)}
        className="py-0 px-2 hover:bg-hover-clr hover:rounded-md"
      >
        <i className="text-lg fas fa-ellipsis-h text-dense-blue"></i>
      </Button>
    </header>
  );
}

export default ListHeader;
