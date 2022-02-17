import { useState, useRef } from "react";

function UseRename({ initialName, className }) {
  const [rename, setRename] = useState(false);
  const [name, setName] = useState(initialName);
  const txtAreaRef = useRef();

  const renameHandler = () => {
    txtAreaRef.current.value = name;
    setRename(true);
    setTimeout(() => {
      txtAreaRef.current.focus();
    }, 0);
  };

  const renameDone = () => {
    setRename(false);
    setName(txtAreaRef.current.value);
  };

  return (
    <div
      onDoubleClick={renameHandler}
      className={`text-base text-dense-blue w-full ${className || ""}`}
    >
      <textarea
        onBlur={renameDone}
        ref={txtAreaRef}
        type="text"
        className={`bg-transparent p-1 w-full resize-none ${
          rename ? "block" : "hidden"
        }`}
      />
      <h2 className={`p-1 ${rename ? "hidden" : "block"}`}>{name}</h2>
    </div>
  );
}

export default UseRename;
