import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";
import Backdrop from "../modal/Backdrop";
import Button from "../utility/Button";
import { useDB } from "../context/DbContext";
import LoadingCircle from "../utility/LoadingCircle";

function CreateNewBoard({ setNewBoard }) {
  const titleRef = useRef();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const { createBoard } = useDB();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = titleRef.current.value.trim();
    if (title === "") {
      return setErr("required");
    }
    // if (/[\W|\S]/gi.test(title)) {
    //   return setErr("must only contain letters, numbers & space")
    // }
    setLoading(true);
    setErr("");
    const convertedTitle = title.replace(/\s+/g, "-");
    createBoard(convertedTitle);
    setLoading(false);
    navigate(`./${convertedTitle}`);
  };

  return (
    <>
      {createPortal(
        <Backdrop onClick={() => setNewBoard(false)} />,
        document.getElementById("backdrop")
      )}
      {loading && <LoadingCircle msg="create a new board ..." />}
      {!loading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white p-3">
          <form onSubmit={handleSubmit} className="w-56 text-grey-blue">
            <label htmlFor="title" className="font-medium ">
              Board title
            </label>
            <input
              ref={titleRef}
              placeholder="killer queen"
              className="block mt-2 w-full h-7 outline outline-2 outline-red-400 pl-2 focus:outline-blue-500"
            />
            {err && <small>{err}</small>}
            <Button className="bg-primary py-1 rounded-sm w-full mt-3 text-white">
              Create
            </Button>
          </form>
        </div>
      )}
    </>
  );
}

export default CreateNewBoard;
