import express from "express";
import { handleTestApiRoute, handleProfileUpdate } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get('/', handleTestApiRoute)
router.put('/update/:id', verifyToken, handleProfileUpdate)

export default router;