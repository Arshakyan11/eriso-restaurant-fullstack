import express from "express";
import {
  getInfoUser,
  loginUser,
  registerUser,
  resetPassword,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "../validators/auth.validator.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post("/signup", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.post(
  "/resetPassword",
  authMiddleware,
  validate(resetPasswordSchema),
  resetPassword,
);
router.get("/me", authMiddleware, getInfoUser);

export default router;
