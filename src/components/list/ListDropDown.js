import React from "react";

import { useDB } from "../context/DbContext";

import Button from "../utility/Button";

function ListDropDown({ listId }) {
  const { deleteList } = useDB();

  return (
    <div className="shadow-md rounded-md absolute w-[18rem] top-12 left-[16.5rem] z-10 bg-white p-4">
      <h3 className="text-center border-b-[1px] border-black pb-3">
        List Actions
      </h3>
      <ul className="my-2">
        <li className="">
          <Button
            clickFunc={() => deleteList(listId)}
            className="py-2 w-full text-left hover:bg-orange-200"
          >
            Delete List
          </Button>
        </li>
        <li className="">
          <Button className="py-2 w-full text-left hover:bg-orange-200">
            Sort by (Alphabetically)
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default ListDropDown;
