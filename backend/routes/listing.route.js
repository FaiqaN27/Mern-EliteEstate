import express from "express";
import { handleCreateListing, handleUploadImage, handleDeleteImage, handleDeleteListing, handleUpdateListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { upload } from '../middlewares/multer.cloudinary.js';

const router = express.Router();

router.post('/create', verifyToken, handleCreateListing);
router.post('/uploadImg', verifyToken, upload.array('images', 6), handleUploadImage);
router.post('/deleteImg', verifyToken, handleDeleteImage);
router.delete('/delete/:id', verifyToken, handleDeleteListing)
router.put('/update/:id', verifyToken, handleUpdateListing)

export default router;