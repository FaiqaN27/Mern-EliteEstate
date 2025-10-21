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

export const handleGetSearchListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [true, false] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [true, false] };
    }

    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const listings = await Listing.find({
      title: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
    }).sort(
      { [sort]: order }
    ).limit(limit).skip(startIndex);

    return res.status(200).json(listings);
  }
  catch (error) {
    next(error);
  }
}