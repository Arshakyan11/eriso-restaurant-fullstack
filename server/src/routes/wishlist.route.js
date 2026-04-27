import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  deleteWishlistItem,
  editCountOfItem,
  getAllWishList,
  updateWishList,
} from "../controllers/wishlist.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { wishlistSchema } from "../validators/wishlist.validator.js";

const router = express.Router();
router.get("/", authMiddleware, getAllWishList);
router.post("/", authMiddleware, validate(wishlistSchema), updateWishList);
router.delete("/:id", authMiddleware, deleteWishlistItem);
router.patch("/:id", authMiddleware, editCountOfItem);

export default router;
