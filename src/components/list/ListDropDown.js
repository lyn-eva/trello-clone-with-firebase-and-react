import React from "react";

function ListDropDown() {
  return (
    <div className="hidden shadow-md rounded-md absolute w-64 left-[16.5rem] z-10 bg-white p-4">
      <h3 className='text-center border-b-[1px] border-black pb-3'>List Actions</h3>
      <ul className='my-2'>
        <li className='py-2'>Delete List</li>
        <li className='py-2'>Sort by (Alphabetically)</li>
      </ul>
    </div>
  );
}

export default ListDropDown;
