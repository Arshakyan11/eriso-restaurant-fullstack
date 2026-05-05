import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { updatingProfileInformation } from "../api/api";
import type { RootState } from "../store";

interface ProfileSliceType {
  isHiden: boolean;
  isHiddenOld: boolean;
  error: null | string;
  loading: boolean;
}

const initialState: ProfileSliceType = {
  isHiden: true,
  isHiddenOld: true,
  error: null,
  loading: false,
};

const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setTypeOfChanginPass: (state, action: PayloadAction<boolean>) => {
      state.isHiden = action.payload;
    },
    setTypeofOldPassowrd: (state, action: PayloadAction<boolean>) => {
      state.isHiddenOld = action.payload;
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
