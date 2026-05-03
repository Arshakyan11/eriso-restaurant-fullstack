import type { WishList } from "../types";
import { apiClient } from "./instance";

export const addToWishlistpi = async (data: WishList) => {
  const res = await apiClient.post(
    `${import.meta.env.VITE_BACKEND_LINK}/wishlist`,
    data,
  );
  return res.data;
};

export const editCountOfItemAPi = async (id: string) => {
  const res = await apiClient.patch(
    `${import.meta.env.VITE_BACKEND_LINK}/wishlist`,
  );
  return res.data;
};

export const deleteItemFromWishlist = async (id: string) => {
  const res = await apiClient.delete(
    `${import.meta.env.VITE_BACKEND_LINK}/wishlist`,
  );
  return res.data;
};
