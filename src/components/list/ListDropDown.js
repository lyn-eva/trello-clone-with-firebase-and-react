import React from "react";
import { useDB } from "../context/DbContext";
import Button from "../utility/Button";

function ListDropDown({ listId }) {
  const { deleteList } = useDB();

  return (
    <div className="shadow-md rounded-md absolute w-[18rem] top-12 left-[16.5rem] z-10 bg-white p-4">
      <h3 className="text-center border-b-[1px] border-black pb-3">List Actions</h3>
      <ul className="my-2">
        <li>
          <Button
            clickFunc={() => deleteList(listId)}
            className="py-2 w-full text-left hover:bg-hover-clr"
          >
            Delete List
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default ListDropDown;
