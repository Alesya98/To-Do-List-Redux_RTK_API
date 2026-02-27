import { useNavigate } from "react-router-dom";

export const LogOut = () => {
  const navigate = useNavigate();
  const handleOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <button className="btn-task" onClick={handleOut}>
        Выйти
      </button>
    </>
  );
};
