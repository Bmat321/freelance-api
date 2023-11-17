/* eslint-disable no-undef */
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/auth.routes.js";
import usersRoute from "./routes/user.routes.js";
import gigsRoute from "./routes/gig.routes.js";
import messagesRoute from "./routes/message.routes.js";
import ordersRoute from "./routes/order.routes.js";
import conversationsRoute from "./routes/conversation.routes.js";
import reviewsRoute from "./routes/review.routes.js";

dotenv.config();

const app = express();

mongoose.set("strictQuery", false);

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO);
    console.log("Connected to Mongo");
  } catch (error) {
    console.log(error);
  }
};

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/gigs", gigsRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/conversations", conversationsRoute);
app.use("/api/reviews", reviewsRoute);
app.use("/api/messages", messagesRoute);

app.use((err, req, res, _next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(8800, () => {
  connect();
  console.log("Backend is running");
});

//unknown route
app.all("*", (req, res, next) => {
  const err = new Error(`Route of ${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err);
});
