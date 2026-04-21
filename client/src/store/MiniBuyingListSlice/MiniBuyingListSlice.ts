import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { changingCountOfItem } from "../api/api";
import type { RootState } from "../store";

interface MiniBuyingListType {
  isOpenModal: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: MiniBuyingListType = {
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
    builder.addCase(changingCountOfItem.fulfilled, (state, _) => {
      state.loading = false;
      state.error = null;
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
