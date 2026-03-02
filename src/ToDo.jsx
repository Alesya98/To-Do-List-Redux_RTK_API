import { useEffect } from "react";

import Header from "./Header";
import InputTask from "./InputTask";
import ToDoList from "./ToDoList";
import ButtonComp from "./ButtonComp";
import DeleteActiveTask from "./DeleteActiveTask";
import { useDispatch } from "react-redux";
import { getTasks } from "./api/taskAPI";

const ToDo = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <>
      <Header />
      <InputTask />
      <ToDoList />
      <ButtonComp />
      <DeleteActiveTask />
    </>
  );
};

export default ToDo;
