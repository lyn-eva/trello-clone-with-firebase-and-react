import { useDB } from "../context/DbContext";
import Button from "../utility/Button";

function BoardHeader({ toggleSidebar }) {
  const { currentBoard } = useDB();

  return (
    <header className="m-2 flex justify-between">
      <h1 className="text-2xl font-medium">{currentBoard && currentBoard.title}</h1>
      <ul className="flex justify-end gap-4">
        <li>
          <Button
            clickFunc={toggleSidebar}
            className="text-white py-[5px] bg-[rgba(255,255,255,.2)] rounded-md"
          >
            <i className="text-lg fas fa-ellipsis-h text-dense-blue mr-3 text-inherit"></i>
            Filter
          </Button>
        </li>
        <li>
          <Button
            clickFunc={toggleSidebar}
            className="text-white py-[5px] bg-[rgba(255,255,255,.2)] rounded-s"
          >
            <i className="text-lg fas fa-ellipsis-h text-dense-blue mr-3 text-inherit"></i>
            Show menu
          </Button>
        </li>
      </ul>
    </header>
  );
}

export default BoardHeader;
