import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchCurrentUser, getLocalUserStrict } from "../api/api";
import type { SignInUserInfoType } from "../../types";
import type { RootState } from "../store";

interface InitialStateType {
  userInfo: SignInUserInfoType | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: InitialStateType = {
  userInfo: getLocalUserStrict(),
  isLoading: false,
  error: null,
};

const AuthSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<SignInUserInfoType>) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.isLoading = true;
      state.userInfo = action.payload;
    });
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.payload ?? "Something Went Wrong!!";
    });
  },
});

export default AuthSlice.reducer;
export const { setUserInfo } = AuthSlice.actions;
export const getUserInfo = (state: RootState) => state.authentication;
