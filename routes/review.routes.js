import express from "express"
import { verifyToken } from "../middlewear/jwt.js"
import { createReviews, deleteReviews, gegtReviews } from "../controllers/review.controller.js"


const router = express.Router()

router.post("/", verifyToken, createReviews)
router.get("/:gigId", gegtReviews)
router.delete("/:id", deleteReviews)

export default router;