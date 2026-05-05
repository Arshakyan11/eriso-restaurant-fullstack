import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./src/routes/auth.route.js";
import wishlistRoute from "./src/routes/wishlist.route.js";
import reservationRoute from "./src/routes/reservation.route.js";
import cors from "cors";
import {
  applimiter,
  loginLimiter,
  signupLimiter,
} from "./src/middlewares/rateLimit.middleware.js";
dotenv.config();
const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth/login", loginLimiter);
app.use("/auth/signup", signupLimiter);

app.use(applimiter);

app.use("/auth", userRoute);
app.use("/wishlist", wishlistRoute);
app.use("/reservation", reservationRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  return res.status(status).json({
    message: err.message || "Something went wrong!!",
  });
});

const runServer = async () => {
  try {
    const PORT = process.env.PORT || 8000;
    const HOST = process.env.HOST;
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`CONNECTED TO MONGODB`);
    app.listen(PORT, HOST, () => {
      console.log(`SERVER CONNECTED SUCCESSFULLY \nhttp://${HOST}:${PORT}`);
    });
  } catch (error) {
    console.log(`Connection Rejected , Please try again later`);
    console.log(`Something Went Wrong!!`, error.message);
  }
};

runServer();
