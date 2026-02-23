import { useState, memo } from "react";
import { useDispatch } from "react-redux";
import {
  cheсkedTasksActions,
  deleteTasksActions,
  editTasksActions,
} from "./redux/actions/tasksActions";

const Task = ({ task }) => {
  // console.log(task)
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const hendelSend = (e) => {
    // console.log("кнопка нажата");
    if (e.key === "Enter") {
      if (editText.trim() === "") {
        setEditText(task.title);
        setIsEdit((isEdit) => !isEdit);
        return;
      }
      editTitle(task.id, editText);
      setIsEdit((isEdit) => !isEdit);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            accept: "application/json",
          },
        },
      );
      // const data = response.json()
      //   console.log(data)
      if (response.ok) {
        dispatch(deleteTasksActions(id));
      } else {
        console.log("Ошибка");
      }
    } catch (error) {
      console.log("Ошибка", error);
    }
  }; //храниться в store

  const checkedTask = async (id, isCompleted) => {
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}/isCompleted`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isCompleted: !isCompleted }),
        },
      );
      if (response.ok) {
        dispatch(cheсkedTasksActions(id));
      } else {
        console.log("Ошибка", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editTitle = async (id, newTitle) => {
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({ title: newTitle }),
        },
      );

      if (response.ok) {
        dispatch(editTasksActions({ id, editText }));
      } else {
        console.log("Ошибка при обновлении на сервере");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="task">
      <input
        className="task-check"
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => checkedTask(task.id, task.isCompleted)}
      />
      {!isEdit ? (
        <p className={task.isCompleted ? "check" : ""}>{task.title}</p>
      ) : (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={hendelSend}
        />
      )}

      <div className="btn">
        <button
          className="btn-task"
          onClick={() => setIsEdit((isEdit) => !isEdit)}
        >
          ✏️
        </button>
        <button className="btn-task" onClick={() => deleteTask(task.id)}>
          ❌
        </button>
      </div>
    </div>
  );
};

export default memo(Task);
