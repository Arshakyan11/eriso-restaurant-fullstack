import type { NavigateFunction } from "react-router-dom";
import { ROUTES } from "../routes/Routes";

export const LogOutFromAccount = (navigate: NavigateFunction): void => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("idToken");
  navigate(ROUTES.HOME, { replace: true });
  window.location.reload();
};
