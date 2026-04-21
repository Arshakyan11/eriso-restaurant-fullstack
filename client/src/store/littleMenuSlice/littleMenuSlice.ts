import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchingLittleMenu } from "../api/api";
import type { RootState } from "../store";
import type { DataOflittleMenuType } from "../../types";

interface LittleMenuSliceType {
  data: DataOflittleMenuType[];
  error: string | null;
  loading: boolean;
  activeCategory: string | null;
}

const initialState: LittleMenuSliceType = {
  data: [],
  error: null,
  loading: false,
  activeCategory: null,
};

const littleMenuSlice = createSlice({
  name: "littleMenu",
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchingLittleMenu.pending, (state, _) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchingLittleMenu.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(fetchingLittleMenu.rejected, (state, action) => {
      state.error = action.payload ?? "Something went wrong!";
      state.loading = false;
    });
  },
});

export default littleMenuSlice.reducer;
export const { setActiveCategory } = littleMenuSlice.actions;

export const gettAllInfo = (state: RootState) => state.littleMenu;
export const gettData = (state: RootState) => state.littleMenu.data;
