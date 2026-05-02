import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  id: string;
  exp: number;
};
export const clearAuthStorage = () => {
  localStorage.removeItem("idToken");
  localStorage.removeItem("userInfo");
};

export const isTokenValid = () => {
  const token = localStorage.getItem("idToken");
  if (!token) {
    return false;
  }
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const isExpired = decoded.exp * 1000 < Date.now();
    if (isExpired) {
      clearAuthStorage();
      return false;
    }
    return true;
  } catch (error) {
    clearAuthStorage();
    return false;
  }
};
