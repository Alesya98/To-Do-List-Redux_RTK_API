import "./App.css";
import Login from "./Login";
import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";
import PrivateRouter from "./PrivateRoute";
import ToDo from "./ToDo";

function App() {
  return (
    <>
      <Routes>
        <Route path="/registre" element={<Login />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/" element={
          localStorage.getItem('token') ? <Navigate to="/todo" replace/> : <Navigate to="/login" replace/>
        } />
        <Route element={<PrivateRouter />}>
          <Route path="/todo" element={<ToDo />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
