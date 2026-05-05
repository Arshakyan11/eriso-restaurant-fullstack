import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getLocalUserStrict, updatingProfileInformation } from "../api/api";
import type { RootState } from "../store";
const userInfo = getLocalUserStrict() || null;

interface ProfileSliceType {
  isHiden: boolean;
  isHideemOld: boolean;
  error: null | string;
  loading: boolean;
  initialValues: {
    email: string;
    password: string;
    newPassword: string;
    newPasswordRepeat: string;
  };
}

const initialState: ProfileSliceType = {
  isHiden: true,
  isHideemOld: true,
  error: null,
  loading: false,
  initialValues: {
    email: userInfo?.email || "",
    password: "",
    newPassword: "",
    newPasswordRepeat: "",
  },
};

const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setTypeOfChanginPass: (state, action: PayloadAction<boolean>) => {
      state.isHiden = action.payload;
    },
    setTypeofOldPassowrd: (state, action: PayloadAction<boolean>) => {
      state.isHideemOld = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updatingProfileInformation.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatingProfileInformation.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updatingProfileInformation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Something Went Wrong!!";
    });
  },
});

export default ProfileSlice.reducer;
export const { setTypeOfChanginPass, setTypeofOldPassowrd } =
  ProfileSlice.actions;
export const getAllProfileInfo = (state: RootState) => state.profile;
