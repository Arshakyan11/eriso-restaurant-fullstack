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
    userEmail: string;
    userOldPass: string;
    userNewPass: string;
    userNewPassRepeat: string;
  };
}

const initialState: ProfileSliceType = {
  isHiden: true,
  isHideemOld: true,
  error: null,
  loading: false,
  initialValues: {
    userEmail: userInfo?.email || "",
    userOldPass: "",
    userNewPass: "",
    userNewPassRepeat: "",
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
    setEmailManualy: (state, action: PayloadAction<string>) => {
      state.initialValues.userEmail = action.payload;
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
export const { setTypeOfChanginPass, setTypeofOldPassowrd, setEmailManualy } =
  ProfileSlice.actions;
export const getAllProfileInfo = (state: RootState) => state.profile;
