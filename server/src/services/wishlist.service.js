import { errorThrower } from "../utils/errorThrower.js";
import User from "../models/user.model.js";

export const getWishlistService = async (userID) => {
  const result = await User.findOne({ _id: userID });
  if (!result) {
    errorThrower("User doesnt found!!");
  }
  return {
    wishList: result.wishList,
    totalCheckPrice: result.totalCheckPrice,
  };
};

export const updateWishlistService = async (userWishList, userID) => {
  const { id, name, price, calories, count, img } = userWishList || {};

  if ((!id, !name || !price || !calories || count == null || !img)) {
    errorThrower("All required fields must be provided");
  }
  const user = await User.findById(userID);
  if (!user) {
    errorThrower("User not found", 404);
  }
  const existingItem = user.wishList.find((elm) => elm.id === id);
  if (existingItem) {
    errorThrower("Item is already in Wishlist", 400);
  }
  user.totalCheckPrice += +price;
  user.wishList.push({
    id,
    name,
    price,
    calories,
    count,
    img,
  });
  await user.save();
  return {
    message: "Item successfully added to wishlist",
    wishList: user.wishList,
    totalCheckPrice: Number(user.totalCheckPrice.toFixed(3)),
  };
};

export const deleteWishlistItemService = async (userID, itemID) => {
  if (!itemID || itemID.trim() === "") {
    errorThrower("Item param needs to exist", 400);
  }
  const user = await User.findById(userID);
  if (!user) {
    errorThrower("User not found", 404);
  }
  const existingItem = user.wishList.find((item) => item.id === itemID);
  if (!existingItem) {
    errorThrower("Item not found", 404);
  }
  user.wishList = user.wishList.filter((item) => item.id !== itemID);
  user.totalCheckPrice -= existingItem.price * existingItem.count;
  await user.save();
  return {
    message: "Item removed from wishlist",
    wishList: user.wishList,
    totalCheckPrice: Number(user.totalCheckPrice.toFixed(3)),
  };
};

export const editCountOfItemService = async (userID, itemID, action) => {
  if (!itemID) {
    errorThrower("Item param needs to exist", 400);
  }
  if (!action) {
    errorThrower("Action is required", 400);
  }

  const user = await User.findById(userID);
  if (!user) {
    errorThrower("User not found", 404);
  }
  const existingItem = user.wishList.find((item) => item.id === itemID);
  if (!existingItem) {
    errorThrower("Item not found", 404);
  }

  if (action === "increment") {
    if (existingItem.count >= 10) {
      return errorThrower("Maximum count is 10", 400);
    }
    existingItem.count += 1;
    user.totalCheckPrice += existingItem.price;
  } else if (action === "decrement") {
    if (existingItem.count === 1) {
      return errorThrower("Minimum Count is One", 400);
    }
    existingItem.count -= 1;
    user.totalCheckPrice -= existingItem.price;
  } else {
    errorThrower("Invalid action", 400);
  }
  user.markModified("wishList");
  await user.save();
  return {
    message: "Wishlist updated successfully",
    wishList: user.wishList,
    totalCheckPrice: Number(user.totalCheckPrice.toFixed(3)),
  };
};
