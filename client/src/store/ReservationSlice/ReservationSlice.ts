import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  addingReserveTable,
  deletingReservationTime,
  getLocalUserStrict,
} from "../api/api";
import type { RootState } from "../store";
import type { UserInfoType } from "../../types";

interface ReservationSliceType {
  userData: UserInfoType | null;
  loading: boolean;
  error: string | null;
  initialValues: {
    address: string;
    date: string;
    count: string;
    tableType: string;
  };
}
const initialState: ReservationSliceType = {
  userData: getLocalUserStrict(),
  loading: false,
  error: null,
  initialValues: {
    address: "",
    date: "",
    count: "",
    tableType: "",
  },
};

const ReservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setUserInfoManualy: (state, action: PayloadAction<UserInfoType>) => {
      state.userData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addingReserveTable.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addingReserveTable.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.userData = action.payload ?? state.userData;
    });
    builder.addCase(addingReserveTable.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Something went wrong!!";
    });
    builder.addCase(deletingReservationTime.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deletingReservationTime.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.userData = action.payload;
    });
    builder.addCase(deletingReservationTime.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Something went wrong!!";
    });
  },
});

export default ReservationSlice.reducer;
export const { setUserInfoManualy } = ReservationSlice.actions;
export const getAllReservationInfo = (state: RootState) => state.reservation;
