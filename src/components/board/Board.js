import { useState } from "react";
import List from "../list/List";

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
  const addTodb = (i, note) => {
    console.log("triggered");
    psudoData[i].notes.push({ txt: note });
    console.log(psudoData);
    setData([...psudoData]);
  };
  return (
    <ul className="flex gap-2 p-2">
      {data.map((list, i) => (
        <List key={list.id} data={list} listIdx={i} addTodb={addTodb} />
      ))}
    </ul>
  );
}

export default Board;
