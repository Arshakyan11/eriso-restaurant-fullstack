import { errorThrower } from "../utils/errorThrower.js";
import User from "../models/user.model.js";

export const postReservationService = async (data, userID) => {
  const { address, date, count, tableType } = data || {};
  if (!address || !date || count == null || !tableType) {
    errorThrower("All required fields must be provided");
  }
  const result = await User.findOneAndUpdate(
    { _id: userID, reservation: { $exists: false } },
    {
      $set: { reservation: { address, date, count, tableType } },
    },
    {
      returnDocument: "after",
    },
  );
  if (!result) {
    errorThrower("Reservation already exists", 400);
  }
  const { password: _, ...lastResult } = result.toObject();
  return lastResult;
};

export const deleteReservationService = async (userID) => {
  if (!userID) {
    errorThrower("UserID doesnt found", 400);
  }
  const result = await User.findOneAndUpdate(
    {
      _id: userID,
      reservation: { $exists: true },
    },
    {
      $unset: { reservation: "" },
    },
    {
      returnDocument: "after",
    },
  );
  if (!result) {
    errorThrower("Reservation not found", 400);
  }
  return { message: "Reservation deleted successfully" };
};
