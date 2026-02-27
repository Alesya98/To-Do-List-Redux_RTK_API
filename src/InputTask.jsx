import { useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cheng, selectorText, zero } from "./redux/inputTextSlice";
import { addTasks } from "./api/taskAPI";

const InputTask = () => {
  const dispatch = useDispatch();
  const value = useSelector(selectorText);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    dispatch(cheng(e.target.value));
  };

  const addNewTasks = () => {
    dispatch(addTasks(value));
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
