import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllTasks } from "./redux/taskSlice";
import { clearTask } from "./api/taskAPI";

const DeleteActiveTask = () => {
  const value = useSelector(selectAllTasks);
  const dispatch = useDispatch();

  const taskLength = value.filter((item) => !item.isCompleted);
  const clearDone = value.filter((item) => item.isCompleted);

  const clearActive = () => {
    for(const task of clearDone) {
       dispatch(clearTask(task.id));
    }
   
  }

  return (
    <div>
      <p>Осталось дел: {taskLength.length} </p>
      <button
        className="search-btn"
        style={{ marginBottom: "10px" }}
        onClick={clearActive}
      >
        Оистить выполненные: {clearDone.length}
      </button>
    </div>
  );
};

export default memo(DeleteActiveTask);
