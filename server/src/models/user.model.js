import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  wishList: { type: [Object], default: [] },
  totalCheckPrice: { type: String, default: "0.000" },
  reservation: {
    address: String,
    date: String,
    count: Number,
    tableType: String,
  },
});

const model = mongoose.model("User", userSchema);
export default model;
