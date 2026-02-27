import { useState } from "react";
import { useNavigate } from "react-router-dom";

const REGIS_URL = import.meta.env.VITE_REGIS_URL;

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    age: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});

  const handleForm = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: name === "age" ? Number(value) : value,
    });
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${REGIS_URL}/users/register`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        setData({
          username: "",
          email: "",
          password: "",
          gender: "",
          age: "",
        });
        navigate("/login");
      } else if (result.errors) {
        const errorsMap = {};
        result.errors.forEach(({ param, msg }) => {
          errorsMap[param] = msg;
        });
        setFieldErrors(errorsMap);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>Регистрация</h1>
      <form className="form-login">
        <div style={{ marginBottom: "20px" }}>
          <div className="form-registr">
            <label htmlFor="username">Логин</label>
            <input
              className="form-input"
              type="text"
              placeholder="Введите логин"
              onChange={handleForm}
              value={data.username}
              name="username"
              id="username"
            />
          </div>
          {fieldErrors.username && (
            <span style={{ color: "red", fontSize: "10px", lineHeight: "0.5" }}>
              {fieldErrors.username}
            </span>
          )}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <div className="form-registr">
            <label htmlFor="email">E-mail</label>
            <input
              className="form-input"
              type="text"
              placeholder="Введите Email"
              onChange={handleForm}
              value={data.email}
              name="email"
              id="email"
            />
          </div>
          {fieldErrors.email && (
            <span style={{ color: "red", fontSize: "10px", lineHeight: "0.5" }}>
              {fieldErrors.email}
            </span>
          )}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <div className="form-registr">
            <label htmlFor="password">Пароль</label>
            <input
              className="form-input"
              type="text"
              placeholder="Введите пароль"
              onChange={handleForm}
              value={data.password}
              name="password"
              id="password"
            />
          </div>
          {fieldErrors.password && (
            <span
              style={{
                color: "red",
                fontSize: "10px",
                lineHeight: "0.5",
                width: "260px",
              }}
            >
              {fieldErrors.password}
            </span>
          )}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <div className="form-registr">
            <label htmlFor="gender">Пол</label>
            <input
              className="form-input"
              type="text"
              placeholder="Введите пол"
              onChange={handleForm}
              value={data.gender}
              name="gender"
              id="gender"
            />
          </div>
          {fieldErrors.gender && (
            <span style={{ color: "red", fontSize: "10px", lineHeight: "0.5" }}>
              {fieldErrors.gender}
            </span>
          )}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <div className="form-registr">
            <label htmlFor="age">Возраст</label>
            <input
              className="form-input"
              type="number"
              placeholder="Введите возраст"
              onChange={handleForm}
              value={data.age}
              name="age"
              id="age"
            />
          </div>
          {fieldErrors.age && (
            <span style={{ color: "red", fontSize: "10px", lineHeight: "0.5" }}>
              {fieldErrors.age}
            </span>
          )}
        </div>
        <button className="search-btn" type="submit" onClick={handleSubmit}>
          Зарегистрироваться
        </button>
      </form>
    </>
  );
};

export default Login;
