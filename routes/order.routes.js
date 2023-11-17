import express from "express";
import { confirm, getOrders, intent } from "../controllers/order.controller.js";
import { verifyToken } from "../middlewear/jwt.js";

const router = express.Router();

router.get("/", verifyToken, getOrders);
router.post("/create-payment-intent/:id", verifyToken, intent);
router.put("/", verifyToken, confirm);

export default router; 
