import type { CheckingUserType, CreateUserDataType } from "../types";
import { apiClient } from "./instance";

export const registerUserApi = async (data: CreateUserDataType) => {
  const res = await apiClient.post(
    `${import.meta.env.VITE_BACKEND_LINK}/auth/signup`,
    data,
  );
  return res.data;
};

export const loginUserApi = async (data: CheckingUserType) => {
  const res = await apiClient.post(
    `${import.meta.env.VITE_BACKEND_LINK}/auth/login`,
    data,
  );
  return res.data;
};
