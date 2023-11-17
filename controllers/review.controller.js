import gigModel from "../models/gig.model.js";
import reviewModel from "../models/review.model.js";
import createError from "../utils/createError.js";

export const createReviews = async (req, res, next) => {
  if (req.isSeller)
    return next(createError(403, "Seller can`t create a review"));

  const newReviews = new reviewModel({
    userId: req.userId,
    gigId: req.body.gigId,
    star: req.body.star,
    desc: req.body.desc,
  });

  try {
    const review = await reviewModel.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });
    if (review)
      return next(
        createError(403, "You have already created review for this gig")
      );
    const saveReviews = await newReviews.save();
    await gigModel.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, startNumber: 1 },
    });
    res.status(200).send(saveReviews);
  } catch (error) {
    next(error);
  }
};
export const gegtReviews = async (req, res, next) => {
  try {
    const getAllReviews = await reviewModel.find({
      gigId: req.params.gigId,
    });
    res.status(200).send(getAllReviews);
  } catch (error) {
    next(error);
  }
};
export const deleteReviews = async (req, res, next) => {
  try {
    /* empty */
  } catch (error) {
    next(error);
  }
};
