import { errorThrower } from "../utils/errorThrower.js";
import User from "../models/user.model.js";

export const getReservationService = async (userID) => {
  if (!userID) {
    errorThrower("UserID doesnt found", 400);
  }
  const user = await User.findById(userID);
  if (!user) {
    errorThrower("User not found", 404);
  }
  return user.reservation;
};

export const postReservationService = async (data, userID) => {
  const { address, date, count, tableType } = data || {};
  if (!address || !date || count == null || !tableType) {
    errorThrower("All required fields must be provided");
  }
  const result = await User.findOneAndUpdate(
    { _id: userID, reservation: null },
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
  return { message: "Successfully reserved" };
};

export const deleteReservationService = async (userID) => {
  if (!userID) {
    errorThrower("UserID doesnt found", 400);
  }
  const result = await User.findOneAndUpdate(
    {
      _id: userID,
      reservation: { $ne: null },
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
