/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import userModel from "../models/user.model.js";
import createError from "../utils/createError.js";

export const getSingleUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);

    const { password, ...info } = user._doc;
    res.status(200).send(info);
  } catch (error) {
    next(createError(500, "Something went wrong!"));
  }
};

export const deleteUser = async (req, res, next) => {
  const user = await userModel.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can only delete your account"));
  }
  await userModel.findByIdAndDelete(req.params.id);
  return next(createError(200, "Deleted successfully"));
};
