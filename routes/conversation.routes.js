import express from "express";
import {
  createConversations,
  getConversations,
  getSingleConversation,
  updateConversation,
} from "../controllers/conversation.controller.js";
import { verifyToken } from "../middlewear/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createConversations);
router.get("/", verifyToken, getConversations);
router.get("/single/:id", verifyToken, getSingleConversation);
router.put("/:id", verifyToken, updateConversation);

export default router;
