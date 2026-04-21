import { createSlice } from "@reduxjs/toolkit";
import { fetchingSearchMenu } from "../api/api";
import type { RootState } from "../store";
import type { DataOfSearchingMenuType } from "../../types";

interface SearchSliceType {
  loading: boolean;
  error: string | null;
  foundedData: DataOfSearchingMenuType[];
  queryByUser: null | string;
}

const initialState: SearchSliceType = {
  foundedData: [],
  queryByUser: null,
  loading: false,
  error: null,
};

const SearchSlice = createSlice({
  name: "searching",
  initialState,
  reducers: {
    clearFoundedData: (state) => {
      state.foundedData = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchingSearchMenu.pending, (state, _) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchingSearchMenu.fulfilled, (state, action) => {
      let rcvingData = action.payload;
      state.loading = false;
      state.error = null;
      state.foundedData = rcvingData.data;
      state.queryByUser = rcvingData.queryName;
    });
    builder.addCase(fetchingSearchMenu.rejected, (state, action) => {
      state.error = action.payload ?? "Something Went Wrong";
      state.loading = false;
    });
  },
});

export default SearchSlice.reducer;
export const { clearFoundedData } = SearchSlice.actions;
export const gettAllDataSearching = (state: RootState) => state.searching;
