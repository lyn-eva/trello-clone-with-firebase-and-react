import Button from "../utility/Button";
import UseRename from "../customHooks/UseRename";

function ListHeader({ hdr }) {
  return (
    <header className="flex justify-between items-center pr-1 text-dense-blue">
      <UseRename initialName={hdr}/>
      <Button className="py-0 px-1">
        <i className="text-lg fas fa-ellipsis-h text-dense-blue"></i>
      </Button>
    </header>
  );
}

export default ListHeader;
