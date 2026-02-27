import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const isAuth = localStorage.getItem("token");
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRouter;
