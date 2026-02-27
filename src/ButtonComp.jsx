import { useDispatch } from "react-redux";
import { filter } from "./redux/filterSlice";

const ButtonComp = () => {
  const dispatch = useDispatch();

  return (
    <div
      style={{ display: "flex", gap: "20px", justifyContent: "space-between" }}
    >
      <button className="search-btn" onClick={() => dispatch(filter("active"))}>
        Активные
      </button>
      <button className="search-btn" onClick={() => dispatch(filter("done"))}>
        Готовые
      </button>
      <button className="search-btn" onClick={() => dispatch(filter("all"))}>
        Все
      </button>
    </div>
  );
};

export default ButtonComp;
