import { useContext, useState, memo } from "react";
import { DeleteTaskContext } from "./DeleteTaskContext";

const Task = ({ task }) => {
  // console.log("rerender Task", task.title);
  const context = useContext(DeleteTaskContext);
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
      context.editTitle(task.id, editText);
      setIsEdit((isEdit) => !isEdit);
    }
  };

  return (
    <div className="task">
      <input
        className="task-check"
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => context.checkedTask(task.id, task.isCompleted)}
      />
      {!isEdit ? (
        <p className={task.isDone ? "check" : ""}>{task.title}</p>
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
        <button
          className="btn-task"
          onClick={() => context.deleteTask(task.id)}
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default memo(Task);
