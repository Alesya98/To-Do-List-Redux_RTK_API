import { useDispatch } from "react-redux";
import { filterTasksActions } from "./redux/actions/tasksActions";

const ButtonComp = () => {
  const dispatch = useDispatch();

  return (
    <div
      style={{ display: "flex", gap: "20px", justifyContent: "space-between" }}
    >
      <button
        className="search-btn"
        onClick={() => dispatch(filterTasksActions("active"))}
      >
        Активные
      </button>
      <button
        className="search-btn"
        onClick={() => dispatch(filterTasksActions("done"))}
      >
        Готовые
      </button>
      <button
        className="search-btn"
        onClick={() => dispatch(filterTasksActions("all"))}
      >
        Все
      </button>
    </div>
  );
};

export default ButtonComp;
