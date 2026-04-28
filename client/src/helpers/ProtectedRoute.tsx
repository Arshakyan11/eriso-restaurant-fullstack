import { clearAuthStorage, isTokenValid } from "./checkToken";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../routes/Routes";

const ProtectedRoute = () => {
  const valid = isTokenValid();
  if (!valid) {
    clearAuthStorage();
    return <Navigate to={ROUTES.HOME} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
