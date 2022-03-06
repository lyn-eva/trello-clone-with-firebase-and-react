import { useState, useRef, useEffect } from "react";

function DynamicTxt({ initialName, className, title, updateFunc }) {
  const [rename, setRename] = useState(false);
  const [value, setValue] = useState(initialName);
  const txtAreaRef = useRef();

  useEffect(() => {
    // if (initialName !== "new list") return;
    // renameStart();
  }, [initialName]);

  const renameStart = () => {
    txtAreaRef.current.value = value;
    setRename(true);
    setTimeout(() => {
      txtAreaRef.current.select();
    }, 0);
  };

  const renameEnd = () => {
    setRename(false);
    const newValue = txtAreaRef.current.value;
    setValue(newValue);
    // if (!newValue) return;
    updateFunc(newValue);
    // setName(txtAreaRef.current.value);
  };

  return (
    <div
      onDoubleClick={renameStart}
      className={`${title || ""} text-dense-blue w-full ${className || ""}`}
    >
      <textarea
        onBlur={renameEnd}
        ref={txtAreaRef}
        type="text"
        className={` p-1 w-full resize-none ${rename ? "block" : "hidden"}`}
      />
      <p className={`p-1  ${rename ? "hidden" : "block"}`}>{value}</p>
    </div>
  );
}

export default DynamicTxt;
