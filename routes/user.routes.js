import express from "express"
import { deleteUser, getSingleUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewear/jwt.js";


const router = express.Router()

router.get("/:id",verifyToken, getSingleUser)
router.delete("/:id",verifyToken, deleteUser)

export default router;