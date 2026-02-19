import { useState, memo } from "react";

const InputTask = ({ setTask }) => {
  // console.log("rerender InputTask");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
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
          body: JSON.stringify({ title: text }),
        },
      );

      const data = await response.json();
      // console.log(data)
      setTask((tasks) => [...tasks, data]);
    } catch (error) {
      console.log("Ошибка", error);
    }
  };

  const handleClick = () => {
    if (text.trim() === "") {
      setError("Нельзя добавить пустую задачу");
      return;
    }
    setError("");
    // setTask((tasks) => [
    //   ...tasks,
    //   { id: crypto.randomUUID(), title: text, isDone: false },
    // ]);
    addNewTasks();
    setText("");
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <input
        className="search"
        placeholder="Введите задачу"
        type="text"
        value={text}
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
