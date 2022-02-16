function Note({ children }) {
  return (
    <li className="relative bg-white my-2 py-2 rounded-sm">
      <div className="text-[15px]">
        <div className='px-2'>
          <p>{children}</p>
        </div>
        <input type="text" className='absolute top-0 py-2 bg-transparent -z-10 w-full px-2'/>
      </div>
    </li>
  );
}

export default Note;
