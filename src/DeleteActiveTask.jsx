import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearActiveActions } from "./redux/actions/tasksActions";

const DeleteActiveTask = () => {
  const { value } = useSelector((store) => store.tasks);
  const dispatch = useDispatch();

  const taskLength = value.filter((item) => !item.isCompleted).length;


  const clearActive = async(id) => {
    try {
        const response = await fetch(`https://todo-redev.herokuapp.com/api/todos/${id}`, {
             method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            accept: "application/json",
          },
        })

        // const data = response.json()
        // console.log(data)
          if (response.ok) {
               dispatch(clearActiveActions(id));
              } else {
                console.log("Ошибка");
              }
    } catch (error) {
        console.log(error)
    }
    
  };
  return (
    <div>
      <p>Осталось дел: {taskLength} </p>
      <button
        className="search-btn"
        style={{ marginBottom: "10px" }}
        onClick={() => clearActive()}
      >
        Оистить выполненные
      </button>
    </div>
  );
};

export default memo(DeleteActiveTask);
