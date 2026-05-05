import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  wishList: { type: [Object], default: [] },
  totalCheckPrice: { type: Number, default: 0 },
  reservation: {
    type: {
      address: String,
      date: String,
      count: Number,
      tableType: String,
    },
    default: null,
  },
});

const model = mongoose.model("User", userSchema);
export default model;
