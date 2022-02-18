import { useState } from "react";
import BoardHeader from "./BoardHeader";
import BoardSidebar from "./BoardSidebar";
import List from "../list/List";
import Button from "../utility/Button";

const psudoData = [
  {
    id: "ds3dXfaf",
    name: "trending technologies",
    notes: [{ txt: "nextjs" }, { txt: "typescript" }],
  },
  {
    id: "ea21kfil",
    name: "potential ones",
    notes: [{ txt: "webassembly" }, { txt: "decentralized web" }],
  },
];

function Board() {
  const [data, setData] = useState(psudoData);
  const [sidebarOn, setSidebarOn] = useState(false);

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
    setSidebarOn(prevState => !prevState);
  }

  return (
    <div className="relative p-[0.02px]">
      <BoardHeader
        toggleSidebar={toggleSidebar}
      />
      <BoardSidebar on={sidebarOn} toggleSidebar={toggleSidebar}/>
      <div>
        <ul className="flex gap-2 m-2 h-[90vh]">
          {data.map((list, i) => (
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
              className="text-black pl-6 py-3 w-64 text-left bg-list-clr rounded-md hover:bg-hover-clr hover:text-white hover:rounded-md"
            >
              <i className="fas fa-plus mr-2"></i> Add another list
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Board;
