import Button from "../utility/Button";
import DynamicTxt from "../utility/DynamicTxt";

function ListHeader({ hdr, setDropDownOn }) {
  return (
    <header className="flex justify-between items-center pr-1 text-dense-blue py-2">
      <DynamicTxt title='text-[1.2rem]' initialName={hdr}/>
      <Button clickFunc={() => setDropDownOn(prevState => !prevState)} className="py-0 px-2 hover:bg-hover-clr hover:rounded-md">
        <i className="text-lg fas fa-ellipsis-h text-dense-blue"></i>
      </Button>
    </header>
  );
}

export default ListHeader;
