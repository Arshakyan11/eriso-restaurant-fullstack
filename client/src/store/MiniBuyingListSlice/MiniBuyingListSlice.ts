import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { changingCountOfItem } from "../api/api";
import type { RootState } from "../store";
import type { WishList } from "../../types";

interface MiniBuyingListType {
  isOpenModal: boolean;
  loading: boolean;
  error: string | null;
  wishlist: WishList[];
  totalCheckPrice: Number;
}

const initialState: MiniBuyingListType = {
  wishlist: [],
  totalCheckPrice: 0,
  isOpenModal: false,
  loading: false,
  error: null,
};

const MiniBuyingList = createSlice({
  name: "miniBuyingList",
  initialState,
  reducers: {
    setModalOpenType: (state, action: PayloadAction<boolean>) => {
      state.isOpenModal = action.payload;
    },
  },
  extraReducers: (builder) => {
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

export default MiniBuyingList.reducer;
export const { setModalOpenType } = MiniBuyingList.actions;
export const getAllMiniBuyingListInfo = (state: RootState) =>
  state.miniBuyingList;
