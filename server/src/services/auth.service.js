import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorThrower } from "../utils/errorThrower.js";
export const register = async (data) => {
  const { userName, phoneNumber, email, password } = data || {};
  if (!userName || !phoneNumber || !email || !password) {
    errorThrower("All required fields must be provided");
  }
  const existingUser = await User.findOne({
    $or: [{ email }, { phoneNumber }],
  });
  if (existingUser) {
    errorThrower("User with this email or phone already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await User.create({
    userName,
    phoneNumber,
    email,
    password: hashedPassword,
  });

  const { password: _, ...userData } = result.toObject();
  return userData;
};

export const login = async (data) => {
  const { email, password } = data || {};
  if (!email || !password) {
    errorThrower("All required fields must be provided");
  }
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    errorThrower("Email or Password is wrong", 401);
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);

  if (!isMatch) {
    errorThrower("Email or Password is wrong", 401);
  }

  const token = jwt.sign(
    {
      id: existingUser._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );
  const { userName, phoneNumber, email: userEmail } = existingUser.toObject();

  return {
    user: {
      userName,
      phoneNumber,
      email: userEmail,
    },
    token,
  };
};

export const resetPasswordService = async (data) => {
  const { email, password, newPassword } = data || {};
  if (!email || !password || !newPassword) {
    errorThrower("All required fields must be provided");
  }
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    errorThrower("Email or Password is wrong!!!");
  }
  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    errorThrower("Password is wrong");
  }
  if (password === newPassword) {
    errorThrower("New password must be different");
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  existingUser.password = hashedPassword;
  await existingUser.save();
  return {
    message: "Password has been changed successfully",
  };
};

export const getInfo = async (userID) => {
  const user = await User.findById({ _id: userID });
  if (!user) {
    errorThrower("User not found", 404);
  }
  const { userName, phoneNumber, email } = user.toObject();
  return {
    userName,
    phoneNumber,
    email,
  };
};
