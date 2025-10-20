import Listing from "../models/listing.model.js";
import cloudinary from "../utils/cloudinary.js";
import { handleError } from "../utils/error.js";

export const handleCreateListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);

    return res.status(201).json(listing);
  }
  catch (error) {
    next(error);
  }
}

export const handleGetListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return next(handleError(404, 'Listing not found!'));
    }

    res.status(200).json(listing);
  }
  catch (error) {
    next(error);
  }
}

export const handleDeleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return next(handleError(404, 'Listing not found!'));
    }

    if (req.user.id !== listing.userRef) {
      return next(handleError(401, 'You can only delete your own listing!'));
    }

    //Delete images from cloudinary
    if (listing.imageUrls && listing.imageUrls.length > 0) {
      for (const image of listing.imageUrls) {
        if (image.public_id) {
          try {
            await cloudinary.uploader.destroy(image.public_id);
          } catch (err) {
            console.error("Failed to delete image from Cloudinary:", err);
          }
        }
      }
    }

    await Listing.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'listing deleted successfully!' });
  }
  catch (error) {
    next(error);
  }
}

export const handleUpdateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return next(handleError(404, 'Listing not found!'));
    }

    if (req.user.id !== listing.userRef) {
      return handleError(401, 'You can only edit your own listing!')
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedListing);

  }
  catch (error) {
    next(error);
  }
}