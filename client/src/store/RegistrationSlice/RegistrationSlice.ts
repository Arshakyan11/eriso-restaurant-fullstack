import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { creatingUserData } from "../api/api";
import type { RootState } from "../store";

interface RegistrationSliceType {
  isHidden: boolean;
  loading: boolean;
  error: null | string;
  succesMessage: null | string;
  initialValues: {
    userName: string;
    phoneNumber: string;
    email: string;
    password: string;
    repeatedpassword: string;
  };
}

const initialState: RegistrationSliceType = {
  loading: false,
  error: null,
  succesMessage: null,
  initialValues: {
    userName: "",
    phoneNumber: "",
    email: "",
    password: "",
    repeatedpassword: "",
  },
  isHidden: false,
};

const RegistrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setPasswordType: (state, action: PayloadAction<boolean>) => {
      state.isHidden = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(creatingUserData.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.succesMessage = null;
    });
    builder.addCase(creatingUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.succesMessage = action.payload;
    });
    builder.addCase(creatingUserData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Something Went Wrong!!";
    });
  },
});

export default RegistrationSlice.reducer;
export const { setPasswordType } = RegistrationSlice.actions;
export const getAllRegInfo = (state: RootState) => state.registration;
