import {
  deleteWishlistItemService,
  editCountOfItemService,
  getWishlistService,
  updateWishlistService,
} from "../services/wishlist.service.js";

export const getAllWishList = async (req, res, next) => {
  try {
    const userID = req.user.id;
    const result = await getWishlistService(userID);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateWishList = async (req, res, next) => {
  try {
    const data = req.body;
    const userID = req.user.id;
    const result = await updateWishlistService(data, userID);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteWishlistItem = async (req, res, next) => {
  try {
    const userID = req.user.id;
    const itemID = req.params.id;
    const result = await deleteWishlistItemService(userID, itemID);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const editCountOfItem = async (req, res, next) => {
  try {
    const userID = req.user.id;
    const itemID = req.params.id;
    const { action } = req.body;
    const result = await editCountOfItemService(userID, itemID, action);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
