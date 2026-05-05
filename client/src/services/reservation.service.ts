import type { ReserveTableInfoType } from "../types";
import { apiClient } from "./instance";

export const getReservationApi = async () => {
  const res = await apiClient.get(
    `${import.meta.env.VITE_BACKEND_LINK}/reservation`,
  );
  return res.data;
};

export const makeReservationApi = async (data: ReserveTableInfoType) => {
  const res = await apiClient.post(
    `${import.meta.env.VITE_BACKEND_LINK}/reservation`,
    data,
  );
  return res.data;
};

export const deleteReservationApi = async () => {
  const res = await apiClient.delete(
    `${import.meta.env.VITE_BACKEND_LINK}/reservation`,
  );
  return res.data;
};
