import gigModel from "../models/gig.model.js";
import createError from "../utils/createError.js";

export const createGig = async (req, res, next) => {
  if (!req.isSeller)
    return next(createError(403, "Only seller can create gig"));
  const newGig = new gigModel({
    userId: req.userId,
    ...req.body,
  });
  try {
    const savedGig = await newGig.save();

    res.status(200).json(savedGig);
  } catch (error) {
    next(error);
  }
};
export const deleteGig = async (req, res, next) => {
  try {
    const gig = await gigModel.findById(req.params.id);

    if (gig.userId !== req.userId)
      return next(createError(403, "Only user who create this gig can delete"));
    await gigModel.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted successfully");
  } catch (error) {
    next(error);
  }
};
export const getGig = async (req, res, next) => {
  try {
    const gig = await gigModel.findById(req.params.id);

    if (!gig) return next(createError(404, "Gig not found"));

    res.status(200).send(gig);
  } catch (error) {
    next(error);
  }
};
export const getGigs = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: { ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max }) },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  try {
    const gigs = await gigModel.find(filters).sort({ [q.sort]: -1 });

    if (!gigs) return next(createError(404, "Gig not found"));
    res.status(200).send(gigs);
  } catch (error) {
    next(error);
  }
};
export const updateGig = async (req, res, next) => {
  res.send("Controller is collecting ...");
};
