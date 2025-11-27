import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CreateListing = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    imageUrls: [],
    title: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountedPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const [files, setFiles] = useState([]);
  const [imgUploadError, setImgUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Image Submit Handler
  const handleImageSubmit = async () => {
    if (files.length === 0) {
      return setImgUploadError("Please select at least one image");
    }
    if (files.length + formData.imageUrls.length > 6) {
      return setImgUploadError("You can only upload 6 images per listing");
    }
    setUploading(true);
    setImgUploadError(false);

    try {
      const uploadedImages = await Promise.all(
        [...files].map((file) => storeImage(file))
      );

      setFormData({
        ...formData,
        imageUrls: [...formData.imageUrls, ...uploadedImages],
      });

      setFiles([]);

      document.getElementById("images").value = "";
      setImgUploadError(false);
      setUploading(false);
    } catch (err) {
      setImgUploadError("Image upload failed (max 2MB per image)");
    }
  };

  // Storing images in cloudinary
  const storeImage = async (file) => {
    const formData = new FormData();
    formData.append("images", file);

    const res = await fetch(`${API_BASE_URL}/api/listing/uploadImg`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload Failed");
    const data = await res.json();
    return {
      url: data.images[0].url,
      public_id: data.images[0].public_id,
    };
  };

  const handleRemoveImage = async (index, public_id) => {
    try {
      setDeleting(true);
      await fetch(`${API_BASE_URL}/api/listing/deleteImg`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_id }),
      });

      setFormData({
        ...formData,
        imageUrls: formData.imageUrls.filter((_, i) => i !== index),
      });
      setDeleting(false);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleChange = (e) => {
    if (e.target.id === "rent" || e.target.id === "sale") {
      setFormData({ ...formData, type: e.target.id });
    } else if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    } else if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleListingSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        return setError("You must upload atleast 1 image");
      }

      if (+formData.regularPrice < +formData.discountedPrice) {
        return setError("Discounted Price should be lower than regular price");
      }

      setLoading(true);
      setError(false);
      const res = await fetch(`${API_BASE_URL}/api/listing/create`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });

      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        return;
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-3 mb-12">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>

      <form
        className="flex flex-col sm:flex-row gap-4"
        onSubmit={handleListingSubmit}
      >
        <div className="flex flex-col gap-5 flex-1">
          <input
            id="title"
            placeholder="Title"
            type="text"
            className="bg-background p-3 rounded-lg focus:outline-none"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.title}
          />

          <textarea
            id="description"
            placeholder="Description"
            type="text"
            className="bg-background p-3 rounded-lg focus:outline-none"
            required
            onChange={handleChange}
            value={formData.description}
          />

          <input
            id="address"
            placeholder="Address"
            type="text"
            className="bg-background p-3 rounded-lg focus:outline-none"
            required
            onChange={handleChange}
            value={formData.address}
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 bg-background rounded-lg focus:outline-none"
                id="bedrooms"
                min="1"
                max="10"
                required
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 bg-background rounded-lg focus:outline-none"
                id="bathrooms"
                min="1"
                max="10"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 bg-background rounded-lg focus:outline-none"
                min="50"
                max="10000000"
                id="regularPrice"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                {formData.type === "rent" && (
                  <span className="text-xs">($ / Month)</span>
                )}
              </div>
            </div>

            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="p-3 bg-background rounded-lg focus:outline-none"
                  min="0"
                  max="10000000"
                  id="discountedPrice"
                  onChange={handleChange}
                  value={formData.discountedPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discounted price</p>
                  {formData.type === "rent" && (
                    <span className="text-xs">($ / Month)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-action ml-2">
              The first image will be cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-background rounded-lg w-full cursor-pointer"
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />

            <button
              disabled={uploading}
              type="button"
              className="p-3 cursor-pointer border-3 border-background rounded-lg hover:shadow-lg disabled:opacity-80 hover:bg-background"
              onClick={handleImageSubmit}
            >
              {uploading ? "Uploading ..." : "Upload"}
            </button>
          </div>

          <p className="text-danger text-sm">
            {imgUploadError && imgUploadError}
          </p>

          {formData.imageUrls?.length > 0 &&
            formData.imageUrls.map((image, index) => (
              <div
                className="flex justify-between p-3 border border-background items-center"
                key={index}
              >
                <img
                  src={image.url}
                  alt="listing"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index, image.public_id)}
                  className="text-danger p-3 rounded-lg uppercase hover:opacity-80"
                >
                  Delete
                </button>
              </div>
            ))}

          <button
            className="bg-primary p-3 rounded-lg uppercase text-white font-semibold cursor-pointer hover:opacity-90 disabled:opacity-80"
            disabled={loading || uploading || deleting}
          >
            {loading ? "creating..." : "Create Listing"}
          </button>
          {error && <p className="text-danger text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
