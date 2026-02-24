import { useState, memo } from "react";
import { useDispatch } from "react-redux";
import { check, edit, remove } from "./redux/taskSlice";

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const hendelSend = (e) => {
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

  const deleteTask = () => {
    dispatch(remove(task.id))
  }

  const checkedTask = () => {
    dispatch(check(task.id))
  }

  const editTitle = () => {
    dispatch(edit({id: task.id, title: editText}));
  }
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
