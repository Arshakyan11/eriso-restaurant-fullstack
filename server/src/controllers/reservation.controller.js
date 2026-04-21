import {
  deleteReservationService,
  postReservationService,
} from "../services/reservation.service.js";

export const postReservation = async (req, res, next) => {
  try {
    const data = req.body;
    const userID = req.user.id;
    const result = await postReservationService(data, userID);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteReservation = async (req, res, next) => {
  try {
    const userID = req.user.id;
    const result = await deleteReservationService(userID);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
