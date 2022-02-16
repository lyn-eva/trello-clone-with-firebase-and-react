import React from "react";

function List() {
  return (
    <li className="w-64">
      <div className="bg-list-clr rounded-md p-2">
        <header className="flex justify-between items-center pl-1 pr-1">
          <div className=" text-dense-blue relative">
            <input type="text" className="bg-transparent" />
            <h2 className="absolute top-0">Books</h2>
          </div>
          <button className="px-1">
            <i className="text-lg fas fa-ellipsis-h"></i>
          </button>
        </header>
        <ul>
          {/* <li>note</li> */}
        </ul>
        <div>
          <button className='text-grey-blue'>
            <i className="fas fa-plus pr-2"></i>
            Add a card
          </button>
        </div>
      </div>
    </li>
  );
}

export default List;
