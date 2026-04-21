import express from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);

router.get("/me", authMiddleware, (req, res) => {
  res.json({ message: "Authorized", user: req.user });
});

export default router;
