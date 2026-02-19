import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      const response = await fetch(
        "https://todo-redev.herokuapp.com/api/users/register",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      console.log(data);
      const result = await response.json();
      if (response.ok) {
        console.log("ok");
         setData({
        username: "",
        email: "",
        password: "",
        gender: "",
        age: "",
      });  
      navigate("/login");
      } else {
        const errorsMap = {};
        result.errors?.forEach((error) => {  //? делает проверку есть ли в св-во errors в result
          errorsMap[error.param] = error.msg
          if (error.param === "username") {
            errorsMap.username = error.msg;
          } else if (error.param === "email") {
            errorsMap.email = error.msg;
          } else if (error.param === "password") {
            errorsMap.password = error.msg;
          } else if (error.param === "gender") {
            errorsMap.gender = error.msg;
          } else if (error.param === "age") {
            errorsMap.age = error.msg;
          }
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
