import { createSlice } from "@reduxjs/toolkit";
import { addingWishlistToData, deleteWishListFromData } from "../api/api";
import type { RootState } from "../store";
import type { WishList } from "../../types";

interface WishlistSliceType {
  wishlist: WishList[];
  loading: boolean;
  error: null | string;
}

const initialState: WishlistSliceType = {
  wishlist: [],
  loading: false,
  error: null,
};

const WishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addingWishlistToData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addingWishlistToData.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.wishlist = action.payload;
    });
    builder.addCase(addingWishlistToData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Something Went Wrong!!";
    });
    builder.addCase(deleteWishListFromData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteWishListFromData.fulfilled, (state, action) => {
      state.wishlist = action.payload;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(deleteWishListFromData.rejected, (state, action) => {
      state.error = action.payload ?? "Something Went Wrong!!";
      state.loading = false;
    });
  },
});

export default WishlistSlice.reducer;
export const getallWatchlistInfo = (state: RootState) => state.wishlist;
