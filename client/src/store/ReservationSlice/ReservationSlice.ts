import { createSlice } from "@reduxjs/toolkit";
import { addingReserveTable, deletingReservationTime } from "../api/api";
import type { RootState } from "../store";

interface ReservationSliceType {
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addingReserveTable.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addingReserveTable.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
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
    });
    builder.addCase(deletingReservationTime.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Something went wrong!!";
    });
  },
});

export default ReservationSlice.reducer;
export const getAllReservationInfo = (state: RootState) => state.reservation;
