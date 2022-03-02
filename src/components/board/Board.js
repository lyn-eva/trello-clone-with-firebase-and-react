import { useState, useEffect } from "react";

import BoardHeader from "./BoardHeader";
import BoardSidebar from "./BoardSidebar";
import List from "../list/List";
import Button from "../utility/Button";
import { useDB } from "../context/DbContext";

const psudoData = [
  {
    id: "ds3dXfaf",
    name: "trending technologies",
    notes: [{ txt: "nextjs" }, { txt: "typescript" }],
  },
  // {
  //   id: "ea21kfil",
  //   name: "potential ones",
  //   notes: [{ txt: "webassembly" }, { txt: "decentralized web" }],
  // },
];

function Board() {
  const [data, setData] = useState(psudoData);
  const [list, setList] = useState([]);
  const [sidebarOn, setSidebarOn] = useState(false);
  const { listenToBoardChange, lists } = useDB();

  useEffect(() => {
    const unsub = listenToBoardChange();
    return unsub;
  }, []);

  const addNote = (i, note) => {
    psudoData[i].notes.push({ txt: note });
    setData([...psudoData]);
  };

  const addList = () => {
    psudoData.push({ id: Math.random(), name: "new list", notes: [] });
    setData([...psudoData]);
  };

  const deleteNote = (ListIdx, noteIdx) => {
    psudoData[ListIdx].notes.splice(noteIdx, 1);
    setData([...psudoData]);
  };

  const toggleSidebar = () => {
    setSidebarOn((prevState) => !prevState);
  };

  return (
    <div className="relative p-[0.02px] bg-orange-400 min-w-fit h-fit min-h-screen">
      <BoardHeader toggleSidebar={toggleSidebar} />
      <BoardSidebar on={sidebarOn} toggleSidebar={toggleSidebar} />
      {/* <div> */}
      <ul className="flex gap-2 m-2 h-[calc(100%-54px)]">
        {lists?.map((list, i) => (
          <List
            key={list.id}
            data={list}
            listIdx={i}
            addNote={addNote}
            deleteNote={deleteNote}
          />
        ))}
        <li>
          <Button
            clickFunc={addList}
            className="text-lg text-dense-blue pl-6 py-3 w-[20rem] text-left bg-list-clr duration-300 hover:bg-hover-clr hover:text-white rounded-md"
          >
            <i className="fas fa-plus mr-2"></i> Add another list
          </Button>
        </li>
      </ul>
      {/* </div> */}
    </div>
  );
}

export default Board;
