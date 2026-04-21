import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  deleteReservation,
  postReservation,
} from "../controllers/reservation.controller.js";

const router = express.Router();

router.post("/", authMiddleware, postReservation);
router.delete("/", authMiddleware, deleteReservation);

export default router;
