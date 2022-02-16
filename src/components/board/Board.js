import React from "react";
import List from "../list/List";

function Board() {
  return (
    <ul className='flex gap-2 p-2'>
      <List />
      <List />
    </ul>
  );
}

export default Board;
