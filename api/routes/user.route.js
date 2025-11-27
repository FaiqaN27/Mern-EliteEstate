import express from "express";
import { handleProfileUpdate, handleDeleteUser, handleGetUserListings, handleGetLandlord } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.put('/update/:id', verifyToken, handleProfileUpdate);
router.delete('/delete/:id', verifyToken, handleDeleteUser);
router.get('/listings/:id', verifyToken, handleGetUserListings
);
router.get('/:id', verifyToken, handleGetLandlord)

export default router;