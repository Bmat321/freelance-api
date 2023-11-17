import express from "express"
import { createMessage, getMessage } from "../controllers/message.controller.js";
import { verifyToken } from "../middlewear/jwt.js";


const router = express.Router()

router.post("/", verifyToken, createMessage)
router.get("/:id", verifyToken, getMessage)

export default router; 