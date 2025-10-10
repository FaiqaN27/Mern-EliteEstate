import express from "express";
import { handleTestApiRoute, handleProfileUpdate, handleDeleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get('/', handleTestApiRoute)
router.put('/update/:id', verifyToken, handleProfileUpdate)
router.delete('/delete/:id', verifyToken, handleDeleteUser);

export default router;