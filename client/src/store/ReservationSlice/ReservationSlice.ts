import { createSlice } from "@reduxjs/toolkit";
import {
  addingReserveTable,
  deletingReservationTime,
  gettingReserveTable,
} from "../api/api";
import type { RootState } from "../store";
import type { ReservationType } from "../../types";

interface ReservationSliceType {
  loading: boolean;
  error: string | null;
  reservation: ReservationType | null;
  initialValues: {
    address: string;
    date: string;
    count: string;
    tableType: string;
  };
}
const initialState: ReservationSliceType = {
  loading: false,
  error: null,
  reservation: null,
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
  reducers: {},
  extraReducers: (builder) => {
    ///geting
    builder.addCase(gettingReserveTable.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(gettingReserveTable.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.reservation = action.payload;
    });
    builder.addCase(gettingReserveTable.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Something went wrong!!";
    });
    //adding
    builder.addCase(addingReserveTable.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addingReserveTable.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addingReserveTable.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Something went wrong!!";
    });
    //deleting
    builder.addCase(deletingReservationTime.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deletingReservationTime.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.reservation = null;
    });
    builder.addCase(deletingReservationTime.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Something went wrong!!";
    });
  },
});

export default ReservationSlice.reducer;
export const getAllReservationInfo = (state: RootState) => state.reservation;
