import express from "express";
import { handleProfileUpdate, handleDeleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.put('/update/:id', verifyToken, handleProfileUpdate);
router.delete('/delete/:id', verifyToken, handleDeleteUser);

export default router;