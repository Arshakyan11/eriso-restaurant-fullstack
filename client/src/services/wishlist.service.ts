import type { WishList } from "../types";
import { apiClient } from "./instance";

export const addToWishlistpi = async (data: WishList) => {
  const res = await apiClient.post(
    `${import.meta.env.VITE_BACKEND_LINK}/wishlist`,
    data,
  );
  return res.data;
};

export const editCountOfItemApi = async (id: string, type: string) => {
  const res = await apiClient.patch(
    `${import.meta.env.VITE_BACKEND_LINK}/wishlist/${id}`,
    { action: type },
  );
  return res.data;
};

export const deleteItemFromWishlist = async (id: string) => {
  const res = await apiClient.delete(
    `${import.meta.env.VITE_BACKEND_LINK}/wishlist/${id}`,
  );
  return res.data;
};

export const getWishlist = async () => {
  const res = await apiClient.get(
    `${import.meta.env.VITE_BACKEND_LINK}/wishlist/`,
  );
  return res.data;
};
