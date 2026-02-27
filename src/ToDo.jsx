import { useEffect } from "react";

import Header from "./Header";
import InputTask from "./InputTask";
import ToDoList from "./ToDoList";
import ButtonComp from "./ButtonComp";
import DeleteActiveTask from "./DeleteActiveTask";
import { useSelector, useDispatch } from "react-redux";
import { selectAllTasks } from "./redux/taskSlice";
import { getTasks } from "./api/taskAPI";

const ToDo = () => {
  const dispatch = useDispatch();
  const value = useSelector(selectAllTasks);

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
