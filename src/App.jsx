import { useCallback, useEffect, useState, useMemo } from "react";
import "./App.css";
import Header from "./Header";
import InputTask from "./InputTask";
import ToDoList from "./ToDoList";
import { DeleteTaskContext } from "./DeleteTaskContext";
import ButtonComp from "./ButtonComp";
import DeleteActiveTask from "./DeleteActiveTask";

function App() {
  const [tasks, setTask] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [filter, setFilter] = useState("all");

  const deleteTask = useCallback((id) => {
    setTask((tasks) => tasks.filter((item) => item.id !== id));
  }, []);

  const checkedTask = useCallback((id) => {
    setTask((tasks) =>
      tasks.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item,
      ),
    );
  }, []);

  const editTitle = useCallback((id, newTitle) => {
    setTask((tasks) =>
      tasks.map((item) =>
        item.id === id ? { ...item, title: newTitle } : item,
      ),
    );
  }, []);

  const filteredTask = useMemo(() => {
    tasks.filter((item) => {
      if (filter === "active") return !item.isDone;
      if (filter === "done") return item.isDone;
      return true;
    });
  }, [filter, tasks]);

  const taskLength = useMemo(
    () => filteredTask.filter((item) => !item.isDone).length,
    [filteredTask],
  );

  const clearActive = useCallback(() => {
    setTask((tasks) => tasks.filter((item) => !item.isDone));
  }, []);

  const valueContext = useMemo(() => {
    return { deleteTask, checkedTask, editTitle };
  }, [deleteTask, checkedTask, editTitle]);

  return (
    <>
      <Header />
      <InputTask setTask={setTask} />
      <DeleteTaskContext value={valueContext}>
        <ToDoList tasks={filteredTask} />
      </DeleteTaskContext>
      <ButtonComp setFilter={setFilter} />
      <DeleteActiveTask taskLength={taskLength} clearActive={clearActive} />
    </>
  );
}

export default App;
