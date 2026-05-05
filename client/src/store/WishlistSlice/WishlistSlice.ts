import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  addingWishlistToData,
  changingCountOfItem,
  deleteWishListFromData,
  getWishlistThunk,
} from "../api/api";
import type { RootState } from "../store";
import type { WishList } from "../../types";

interface WishlistSliceType {
  wishlist: WishList[];
  totalCheckPrice: Number;
  loading: boolean;
  error: null | string;
  isOpenModal: boolean;
}

const initialState: WishlistSliceType = {
  wishlist: [],
  totalCheckPrice: 0,
  loading: false,
  isOpenModal: false,
  error: null,
};

const WishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setModalOpenType: (state, action: PayloadAction<boolean>) => {
      state.isOpenModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addingWishlistToData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addingWishlistToData.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.wishlist = action.payload.wishList;
      state.totalCheckPrice = action.payload.totalCheckPrice;
    });
    builder.addCase(addingWishlistToData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Something Went Wrong!!";
    });
    //delete
    builder.addCase(deleteWishListFromData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteWishListFromData.fulfilled, (state, action) => {
      state.wishlist = action.payload.wishList;
      state.totalCheckPrice = action.payload.totalCheckPrice;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(deleteWishListFromData.rejected, (state, action) => {
      state.error = action.payload ?? "Something Went Wrong!!";
      state.loading = false;
    });

    // get Wishlist
    builder.addCase(getWishlistThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getWishlistThunk.fulfilled, (state, action) => {
      state.wishlist = action.payload.wishList;
      state.totalCheckPrice = action.payload.totalCheckPrice;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getWishlistThunk.rejected, (state, action) => {
      state.error = action.payload ?? "Something Went Wrong!!";
      state.loading = false;
    });
    //edit count
    builder.addCase(changingCountOfItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(changingCountOfItem.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.wishlist = action.payload.wishList;
      state.totalCheckPrice = action.payload.totalCheckPrice;
    });
    builder.addCase(changingCountOfItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Something went wrong!!";
    });
  },
});

export default WishlistSlice.reducer;
export const { setModalOpenType } = WishlistSlice.actions;
export const getallWatchlistInfo = (state: RootState) => state.wishlist;
