import { useDB } from "../context/DbContext";
import Button from "../utility/Button";
import DynamicTxt from "../utility/DynamicTxt";

function BoardHeader({ toggleSidebar }) {
  const { currentBoard, updateBoard } = useDB();

  const updateTitle = (title) => {
    updateBoard({title})
  }

  return (
    <header className="my-3 mx-2 flex items-center justify-between flex-wrap gap-2">
      <DynamicTxt updateFunc={updateTitle} initialName={currentBoard.title} rows='1' maxLength='40' noWrap={true}style={{width: 'auto'}} className="text-sm-md sm:text-2xl px-2 text-white font-medium bg-[rgba(255,255,255,.2)] rounded-md py-1"/>
      <ul className="flex justify-end gap-4">
        <li>
          <Button
            clickFunc={toggleSidebar}
            className="text-white py-[5px] bg-[rgba(255,255,255,.2)] rounded-md tracking-wide"
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
