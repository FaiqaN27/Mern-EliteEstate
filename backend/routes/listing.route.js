import express from "express";
import { handleGetListing, handleCreateListing, handleDeleteListing, handleUpdateListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { upload } from '../middlewares/multer.cloudinary.js';
import { handleDeleteImage, handleUploadImage } from "../controllers/cloudinary.controller.js";

const router = express.Router();

router.get('/get/:id', handleGetListing);
router.post('/create', verifyToken, handleCreateListing);
router.delete('/delete/:id', verifyToken, handleDeleteListing)
router.put('/update/:id', verifyToken, handleUpdateListing);

//for cloudinary 
router.post('/uploadImg', verifyToken, upload.array('images', 6), handleUploadImage);
router.post('/deleteImg', verifyToken, handleDeleteImage);

export default router;