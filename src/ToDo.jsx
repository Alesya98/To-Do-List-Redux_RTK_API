import { useEffect } from "react";

import Header from "./Header";
import InputTask from "./InputTask";
import ToDoList from "./ToDoList";
import ButtonComp from "./ButtonComp";
import DeleteActiveTask from "./DeleteActiveTask";
import { useSelector, useDispatch } from "react-redux";
import { get, selectAllTasks } from "./redux/taskSlice";

const ToDo = () => {
  const dispatch = useDispatch();
  const value = useSelector(selectAllTasks);

  const getAllTasks = () => {
    dispatch(get(value));
  }

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
    </>
  );
};

export default ToDo;
