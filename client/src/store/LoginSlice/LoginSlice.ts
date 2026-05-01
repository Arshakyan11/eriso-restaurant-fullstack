import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loginUser } from "../api/api";
import type { RootState } from "../store";
import type { SignInDataRecievingType } from "../../types";

interface LoginSliceType {
  isHidenPASS: boolean;
  loading: boolean;
  error: string | null;
  userInfo: SignInDataRecievingType | null;
  initialValues: {
    email: string;
    password: string;
  };
}

const initialState: LoginSliceType = {
  isHidenPASS: false,
  loading: false,
  error: null,
  userInfo: null,
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
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.userInfo = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Something went wrong!";
      // state.succesMessage = false;
    });
  },
});

export default LoginSlice.reducer;
export const { setLogVisiblePass } = LoginSlice.actions;
export const getAllLoginInfo = (state: RootState) => state.login;
