import { createSlice } from "@reduxjs/toolkit";
import { sendingMessage } from "../api/api";
import type { RootState } from "../store";

interface ContactUsStateType {
  successMessage: string | null;
  error: null | string;
  loading: boolean;
  initialValues: {
    name: string;
    lastname: string;
    email: string;
    subject: string;
    message: string;
  };
}

const initialState: ContactUsStateType = {
  successMessage: null,
  error: null,
  loading: false,
  initialValues: {
    name: "",
    lastname: "",
    email: "",
    subject: "",
    message: "",
  },
};

const ContactUsSlice = createSlice({
  name: "contactForm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendingMessage.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(sendingMessage.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.successMessage = action.payload;
    });
    builder.addCase(sendingMessage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Something went wrong!";
    });
  },
});

export default ContactUsSlice.reducer;
export const getAllData = (state: RootState) => state.contactForm;
