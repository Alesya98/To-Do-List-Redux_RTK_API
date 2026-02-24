import { useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cheng, zero } from "./redux/inputTextSlice";
import { add } from "./redux/taskSlice";

const InputTask = () => {
  const dispatch = useDispatch();
  const { value } = useSelector((store) => store.text);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    dispatch(cheng(e.target.value));
  };

  const addNewTasks = async () => {
    try {
      const response = await fetch(
        "https://todo-redev.herokuapp.com/api/todos",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: value }),
        },
      );

      const data = await response.json();
      dispatch(add(data));
    } catch (error) {
      console.log("Ошибка", error);
    }
  };

  const handleClick = () => {
    if (value.trim() === "") {
      setError("Нельзя добавить пустую задачу");
      return;
    }
    setError("");
    addNewTasks();
    dispatch(zero());
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <input
        className="search"
        placeholder="Введите задачу"
        type="text"
        value={value}
        onChange={handleChange}
      />
      <button className="search-btn" onClick={handleClick}>
        Добавить
      </button>
      {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
    </div>
  );
};

export default memo(InputTask);
