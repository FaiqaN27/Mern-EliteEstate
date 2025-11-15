import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const ShowListings = () => {

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const { currentUser } = useSelector(state => state.user);

  const fetchListings = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        return;
      }
      setListings(data);
      setLoading(false);
    }
    catch (error) {
      setError(error.message)
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchListings()
  }, [])

  const handleDeleteListing = async (listingId) => {
    try {
      setDeletingId(listingId);
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      })

      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setDeletingId(null);
        return;
      }

      setListings((prev) => prev.filter((listing) => listing._id !== listingId));

      setLoading(false);
    }
    catch (error) {
      setError(error.message);
      setDeletingId(null);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto mb-12">

      {listings && listings.length > 0 &&
        <div className="flex flex-col gap-5">
          <h1 className="font-semibold text-3xl text-center my-7">Your Listings</h1>

          {listings.map((listing) => (

            <div className="border-3 border-background rounded-lg p-3 flex justify-between items-center gap-4" key={listing._id}>
              <Link to={`/listing/${listing._id}`}>

                <img src={listing.imageUrls[0].url} alt="listing cover" className="w-20 h-18 object-contain" />
              </Link>

              <Link to={`/listing/${listing._id}`} className="flex-1 text-primary font-semibold truncate hover:underline">
                <p>{listing.title}</p>
              </Link>

              <div className="flex items-center gap-3">
                <Link to={`/update-listing/${listing._id}`}>
                  <button
                    title="Edit"
                    className="p-2 rounded-full bg-blue-50  cursor-pointer  text-primary hover:bg-primary hover:text-white transition duration-200"
                  >
                    <CiEdit size={22} />
                  </button></Link>

                <button
                  disabled={deletingId === listing._id}
                  title="Delete"
                  className={`p-2 rounded-full bg-red-50 text-danger
                  cursor-pointer hover:bg-danger hover:text-white transition duration-200 ${deletingId === listing._id ? "opacity-50 cursor-not-allowed" : ''}`}
                  onClick={() => handleDeleteListing(listing._id)}
                >{
                    deletingId === listing._id ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : <MdDeleteForever size={22} />
                  }
                </button>
              </div>
            </div>
          ))}
        </div>
      }


      {/* Global Loader */}
      {
        loading && (
          <div className="flex justify-center items-center h-screen">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )
      }

      {
       !error && !loading && listings.length === 0 && (
          <div className="flex justify-center items-center h-screen">
            <p className="text-center text-3xl text-primary mt-10">No listings found...</p>
          </div>
        )
      }

      {
        error && (
          <p className="text-center text-2xl text-danger mt-7">{error}</p>
        )
      }

    </div >
  )
}

export default ShowListings