import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearActiveActions } from "./redux/actions/tasksActions";

const DeleteActiveTask = () => {
  const { value } = useSelector((store) => store.tasks);
  const dispatch = useDispatch();

  const taskLength = value.filter((item) => !item.isCompleted);
  const clearDone = value.filter((item) => item.isCompleted);
  const clearActive = async () => {
    try {
      for (const task of clearDone) {
        const response = await fetch(
          `https://todo-redev.herokuapp.com/api/todos/${task.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              accept: "application/json",
            },
          },
        );
        if (response.ok) {
          dispatch(clearActiveActions(task.id));
        } else {
          console.log("Ошибка");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
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
