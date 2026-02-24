import { useEffect } from "react";

import Header from "./Header";
import InputTask from "./InputTask";
import ToDoList from "./ToDoList";
import ButtonComp from "./ButtonComp";
import DeleteActiveTask from "./DeleteActiveTask";
import { LogOut } from "./LogOut";
import { useSelector, useDispatch } from "react-redux";
import { get } from "./redux/taskSlice";

const ToDo = () => {
  const dispatch = useDispatch();
  const {value} = useSelector((store) => store.tasks);
  console.log(value)

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
      dispatch(get(data));
    } catch (error) {
      console.log("Ошибка", error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <>
      <Header />
      <InputTask />
      <ToDoList />
      <ButtonComp />
      <DeleteActiveTask/>
      <LogOut />
    </>
  );
};

export default ToDo;
