import { useNavigate } from "react-router";
import { useDB } from "../context/DbContext";
import { useAuth } from "../context/AuthContext";
import Button from "../utility/Button";
import DynamicTxt from "../utility/DynamicTxt";

function BoardHeader({ toggleSidebar }) {
  const { currentBoard, updateBoard } = useDB();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const updateTitle = (title) => {
    updateBoard({ title });
  };

  return (
    <header className="my-3 mx-2 flex items-center justify-between flex-wrap gap-2">
      <div className="flex gap-4">
        <Button
          clickFunc={() => navigate(`../${currentUser.displayName}`)}
          className="text-white py-[5px] bg-[rgba(255,255,255,.2)] rounded-md tracking-wide"
        >
          <i class="fa-solid fa-arrow-left-long"></i>
        </Button>
        <DynamicTxt
          updateFunc={updateTitle}
          initialName={currentBoard.title}
          rows="1"
          maxLength="40"
          noWrap={true}
          style={{ width: "auto" }}
          className="text-sm-md sm:text-2xl px-2 text-white font-medium bg-[rgba(255,255,255,.2)] rounded-md py-1"
        />
      </div>
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
