import { useState } from "react";
import BoardSidebar from "../list/BoardSidebar";
import List from "../list/List";
import Button from "../utility/Button";

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

  return (
    <div className='relative'>
      {/* <BoardSidebar /> */}
      <div>
        <ul className="flex gap-2 p-2 h-[90vh]">
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
              className="text-black py-[12px] pl-6 w-64 text-left bg-list-clr rounded-md"
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
