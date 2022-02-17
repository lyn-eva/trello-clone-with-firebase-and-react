import UseRename from "../customHooks/UseRename";

function Note({ children }) {
  return (
    <li className="relative bg-white my-2 py-2 rounded-sm">
      <div className="text-[15px]">
          <UseRename className='px-2' initialName={children}/>
        <input type="text" className='absolute top-0 py-2 bg-transparent -z-10 w-full px-2'/>
      </div>
    </li>
  );
}

export default Note;
