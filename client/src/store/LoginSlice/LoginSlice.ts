import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { checkingUserExisting } from "../api/api";
import type { RootState } from "../store";

interface LoginSliceType {
  isHidenPASS: boolean;
  loading: boolean;
  error: string | null;
  userExisting: boolean;
  initialValues: {
    email: string;
    password: string;
  };
}

const initialState: LoginSliceType = {
  isHidenPASS: false,
  loading: false,
  error: null,
  userExisting: false,
  initialValues: {
    email: "",
    password: "",
  },
};

const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogVisiblePass: (state, action: PayloadAction<boolean>) => {
      state.isHidenPASS = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkingUserExisting.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(checkingUserExisting.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.userExisting = action.payload;
    });
    builder.addCase(checkingUserExisting.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Something went wrong!";
      // state.succesMessage = false;
    });
  },
});

export default LoginSlice.reducer;
export const { setLogVisiblePass } = LoginSlice.actions;
export const getAllLoginInfo = (state: RootState) => state.login;
