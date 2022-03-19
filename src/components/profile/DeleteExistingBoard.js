import { createPortal } from "react-dom";
import { useDB } from "../context/DbContext";

import Button from "../utility/Button";
import Backdrop from "../modal/Backdrop";

function DeleteExistingBoard({ setDeleteBOARD, id, title }) {
  const { deleteBoard } = useDB();

  const handleDeleteConfirm = () => {
    deleteBoard(id)
      handleDeleteCancel();
  };
  const handleDeleteCancel = () => {
    setDeleteBOARD((prev) => ({ ...prev, delete: false }));
  };

  return (
    <>
      {createPortal(
        <Backdrop onClick={handleDeleteCancel} />,
        document.getElementById("backdrop")
      )}
        <div className="text-black rounded-sm text-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white p-3">
          <p className="mb-4 leading-8 text-red-500">
            Are you sure you want to delete <br />
            <span className="text-black text-xl underline">{title}</span>
          </p>
          <Button clickFunc={handleDeleteConfirm} className="mr-16">
            yes <i className="ml-1 align-middle text-2xl text-green-500 fas fa-check"></i>
          </Button>
          <Button clickFunc={handleDeleteCancel}>
            no <i className="ml-1 text-red-500 align-middle text-2xl fas fa-times"></i>
          </Button>
        </div>
    </>
  );
}

export default DeleteExistingBoard;
