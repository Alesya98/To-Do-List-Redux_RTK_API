import Task from "./Task";
import { memo } from "react";
import { useSelector } from "react-redux";
import { selectAllTasks } from "./redux/taskSlice";
import { selectFilter } from "./redux/filterSlice";

const ToDoList = () => {
  const value = useSelector(selectAllTasks);
  const valueFilter = useSelector(selectFilter);

  const filteredTasks = value.filter((item) => {
    if (valueFilter === "active") return !item.isCompleted;
    if (valueFilter === "done") return item.isCompleted;
    return true;
  });

  return (
    <div className="tasks">
      {filteredTasks.length === 0 && (
        <h3>Добавь задачу, которую нужно выполнить </h3>
      )}
      {filteredTasks.map((item) => (
        <Task key={item.id} task={item} />
      ))}
    </div>
  );
};

export default memo(ToDoList);
