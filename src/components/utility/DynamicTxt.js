import { useState, useRef, useEffect } from "react";

function DynamicTxt({ initialName, className, title }) {
  const [rename, setRename] = useState(false);
  const [name, setName] = useState(initialName);
  const txtAreaRef = useRef();
  
  useEffect(() => {
    if (initialName !== "new list") return;
    renameStart();
  }, [])

  const renameStart = () => {
    txtAreaRef.current.value = name;
    setRename(true);
    setTimeout(() => {
      // txtAreaRef.current.focus();
      txtAreaRef.current.select();
    }, 0);
  };

  const renameDone = () => {
    setRename(false);
    if (!txtAreaRef.current.value) return;
    setName(txtAreaRef.current.value);
  };

  return (
    <div
      onDoubleClick={renameStart}
      className={`${title || ''} text-dense-blue w-full ${className || ""}`}
    >
      <textarea
        onBlur={renameDone}
        ref={txtAreaRef}
        type="text"
        className={` p-1 w-full resize-none ${
          rename ? "block" : "hidden"
        }`}
      />
      <p className={`p-1  ${rename ? "hidden" : "block"}`}>{name}</p>
    </div>
  );
}

export default DynamicTxt;
