import type {
  CheckingUserType,
  CreateUserDataType,
  UpdateDataOnProfileType,
} from "../types";
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

export const changePasswordApi = async (data: UpdateDataOnProfileType) => {
  const res = await apiClient.post(
    `${import.meta.env.VITE_BACKEND_LINK}/auth/resetPassword`,
    data,
  );
  return res.data;
};

export const getUserInfoApi = async () => {
  const res = await apiClient.get(
    `${import.meta.env.VITE_BACKEND_LINK}/auth/me`,
  );
  return res.data;
};
