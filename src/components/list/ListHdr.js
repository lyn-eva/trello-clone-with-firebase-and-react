import Button from "../utility/Button";

function ListHdr({ hdr }) {
  return (
    <header className="flex justify-between items-center pl-1 pr-1">
      <div className="text-base text-dense-blue relative">
        <input type="text" className="absolute top-0 bg-transparent -z-10" />
        <h2 className="">{hdr}</h2>
      </div>
      <Button className="py-0 px-1 text-inherit">
        <i className="text-lg fas fa-ellipsis-h"></i>
      </Button>
    </header>
  );
}

export default ListHdr;
