import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchingGlobalMenu } from "../api/api";
import type { RootState } from "../store";
import type { DataOfSearchingMenuType } from "../../types";

interface MenuSliceType {
  selectedItems: DataOfSearchingMenuType[];
  selectedParams: null | string;
  isOpenFilterBox: boolean;
  loading: boolean;
  error: string | null;
  filterActivated: boolean;
  filteredData: DataOfSearchingMenuType[];
  filterInfo: number[];
}

const initialState: MenuSliceType = {
  selectedItems: [],
  selectedParams: null,
  isOpenFilterBox: true,
  loading: false,
  error: null,
  filterActivated: false,
  filteredData: [],
  filterInfo: [],
};

const MenuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setFilteredDataByPrice: (state, action) => {
      const { min, max, filterArg } = action.payload;
      state.filterActivated = filterArg;
      if (filterArg === false) {
        state.filteredData = [];
        state.filterActivated = false;
      } else {
        state.filterInfo = [min, max];
        state.filterActivated = true;
        state.filteredData = state.selectedItems.filter(
          (elm) => +elm.price >= min && +elm.price <= max,
        );
      }
    },
    setFilterBoxStatus: (state, action: PayloadAction<boolean>) => {
      state.isOpenFilterBox = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchingGlobalMenu.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.selectedItems = [];
    });
    builder.addCase(fetchingGlobalMenu.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.selectedItems = action.payload.response;
      state.selectedParams = action.payload.query;
      if (state.filterActivated) {
        const [min, max] = state.filterInfo;
        state.filteredData = state.selectedItems.filter(
          (elm) => +elm.price >= min && +elm.price <= max,
        );
      }
    });
    builder.addCase(fetchingGlobalMenu.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Something went wrong!";
    });
  },
});

export default MenuSlice.reducer;
export const { setFilteredDataByPrice, setFilterBoxStatus } = MenuSlice.actions;
export const getAllMenuInfo = (state: RootState) => state.menu;
