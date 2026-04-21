import jwt from "jsonwebtoken";
import { errorThrower } from "../utils/errorThrower.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      errorThrower("Authorization Header is measing!", 401);
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      errorThrower("Token doesnt found!", 401);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
