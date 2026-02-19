import { useCallback, useEffect, useState, useMemo } from "react";

import Header from "./Header";
import InputTask from "./InputTask";
import ToDoList from "./ToDoList";
import { DeleteTaskContext } from "./DeleteTaskContext";
import ButtonComp from "./ButtonComp";
import DeleteActiveTask from "./DeleteActiveTask";

const ToDo = () => {
  const [tasks, setTask] = useState([]);

  const getAllTasks = async () => {
    try {
      const response = await fetch(
        "https://todo-redev.herokuapp.com/api/todos",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const data = await response.json();
      console.log(data);
      setTask(data); //будут такие задачи
    } catch (error) {
      console.log("Ошибка", error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const [filter, setFilter] = useState("all");

  const deleteTask = useCallback(async (id) => {
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
      if (response.ok) {
        setTask((tasks) => tasks.filter((item) => item.id !== id));
      } else {
        console.log("Ошибка при удалении на сервере");
      }
    } catch (error) {
      console.log("Ошибка", error);
    }
  }, []);

  const checkedTask = useCallback(async (id, isCompleted) => {
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}/isCompleted`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isCompleted: !isCompleted}), 
        },
      );
      if (response.ok) {
        setTask((tasks) =>
          tasks.map((item) =>
            item.id === id ? { ...item, isCompleted: !item.isCompleted } : item,
          ),
        );
      } else {
        console.log("Ошибка", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const editTitle = useCallback(async (id, newTitle) => {
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
        setTask((tasks) =>
          tasks.map((item) =>
            item.id === id ? { ...item, title: newTitle } : item,
          ),
        );
      } else {
        console.log("Ошибка при обновлении на сервере");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const filteredTask = useMemo(() => {
    console.log(tasks);
    return tasks.filter((item) => {
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
};

export default ToDo;
