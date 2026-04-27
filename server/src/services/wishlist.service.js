import { errorThrower } from "../utils/errorThrower.js";
import User from "../models/user.model.js";

export const getWishlistService = async (userID) => {
  const result = await User.findOne({ _id: userID });
  if (!result) {
    errorThrower("User doesnt found!!");
  }
  return result.wishList;
};

export const updateWishlistService = async (userWishList, userID) => {
  const { name, price, calories, count, img } = userWishList || {};

  if (!name || !price || !calories || count == null || !img) {
    errorThrower("All required fields must be provided");
  }
  const user = await User.findById(userID);

  if (!user) {
    errorThrower("User not found", 404);
  }
  const existingItem = user.wishList.find((elm) => elm.name === name);
  if (existingItem) {
    errorThrower("Item is already in Wishlist", 400);
  }
  user.wishList.push({
    id: crypto.randomUUID(),
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
  await user.save();
  return { message: "Item removed from wishlist" };
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
      return { message: "Maximum count is 10" };
    }
    existingItem.count += 1;
  } else if (action === "decrement") {
    if (existingItem.count === 1) {
      return { message: "Minimum Count is One" };
    }
    existingItem.count -= 1;
  } else {
    errorThrower("Invalid action", 400);
  }
  user.markModified("wishList");
  await user.save();
  return { message: "Wishlist updated successfully" };
};
