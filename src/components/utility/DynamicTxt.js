import { useState, useRef, useEffect } from "react";

function DynamicTxt({
  initialName,
  className,
  style,
  rows,
  maxLength,
  noWrap,
  updateFunc,
}) {
  const [rename, setRename] = useState(false);
  const [value, setValue] = useState(initialName); //
  const txtAreaRef = useRef();

  useEffect(() => {
    setValue(initialName);
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
    if (value === newValue || newValue === "") return;
    setValue(newValue);
    updateFunc(newValue);
  };

  return (
    <div
      onDoubleClick={renameStart}
      className={`text-dense-blue w-full ${className || ""}`}
      style={style || {}}
    >
      <textarea
        onBlur={renameEnd}
        ref={txtAreaRef}
        type="text"
        rows={rows || ""}
        maxLength={maxLength || ""}
        className={`board-hdr text-black p-1 w-full resize-none ${
          rename ? "block" : "hidden"
        } ${noWrap ? "whitespace-nowrap" : ""}`}
      />
      <p className={`px-1 w-auto whitespace-pre-wrap ${rename ? "hidden" : "block"}`}>
        {value}
      </p>
    </div>
  );
}

export default DynamicTxt;
