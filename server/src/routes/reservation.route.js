import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  deleteReservation,
  getReservation,
  postReservation,
} from "../controllers/reservation.controller.js";
import { reservationSchema } from "../validators/reservation.validator.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, validate(reservationSchema), postReservation);
router.delete("/", authMiddleware, deleteReservation);
router.get("/", authMiddleware, getReservation);

export default router;
