import Listing from "../models/listing.model.js";
import cloudinary from "../utils/cloudinary.js";

export const handleCreateListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);

    return res.status(201).json(listing);
  }
  catch (error) {
    next(error);
  }
}


export const handleUploadImage = async (req, res, next) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No image files provided' });
    }

    // Multer-Cloudinary already uploaded them — just return info
    const images = files.map(file => ({
      url: file.path, // CloudinaryStorage adds 'path' as the secure_url
      public_id: file.filename, // Cloudinary public ID
    }));

    res.status(200).json({ images });
  } catch (error) {
    next(error);
  }
}

export const handleDeleteImage = async (req, res, next) => {
  try {
    const { public_id } = req.body;
    if (!public_id) {
      return res
        .status(400)
        .json({ success: false, message: "public_id is required" });
    }

    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type: "image",
    });


    if (result.result !== "ok" && result.result !== "not found") {
      return res
        .status(500)
        .json({ success: false, message: "Failed to delete image" });
    }

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      result,
    });
  }
  catch (error) {
    next(error);
  }
}