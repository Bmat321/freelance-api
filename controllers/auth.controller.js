/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new userModel({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    return next(createError(201, "User has been created!"));
  } catch (error) {
    next(error);
  }
};

//

export const login = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ username: req.body.username });

    if (!user) return next(createError(404, "User not found!"));
    const correct = bcrypt.compareSync(req.body.password, user.password);
    if (!correct) return next(createError(404, "Wrong Username or password"));

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;
    await res
      .cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "none",
        secure: "true",
      })
      .status(201)
      .json(info);
  } catch (error) {
    next(error);
  }
};
export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: "true",
    })
    .status(200)
    .json("User logout successfully");
};
