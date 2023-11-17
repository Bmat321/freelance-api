import express from "express"
import { verifyToken } from "../middlewear/jwt.js";
import { createGig, deleteGig, getGig, getGigs, updateGig } from "../controllers/gig.controller.js";


const router = express.Router()

router.post("/", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);
router.get("/single/:id",  getGig);
router.get("/", getGigs);
router.put("/:id", verifyToken, updateGig);

export default router;