import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const ShowListings = () => {

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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
      setLoading(fasle);
    }
  }

  useEffect(() => {
    fetchListings()
  }, [])

  return (
    <div className="p-3 max-w-lg mx-auto mb-12">
      <h1 className="font-semibold text-3xl text-center my-7">Your Listings</h1>

      {loading && (
        <div className="flex justify-center items-center h-screen">
          <div className="w-12 h-12 border-4 border-[#0D47C7] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="flex flex-col gap-5">
        {listings && listings.length > 0 &&
          listings.map((listing) => (

            <div className="border-3 border-[#D6E6FF] rounded-lg p-3 flex justify-between items-center gap-4" key={listing._id}>
              <Link to={`/listing/${listing._id}`}>

                <img src={listing.imageUrls[0].url} alt="listing cover" className="w-20 h-18 object-contain" />
              </Link>

              <Link to={`/listing/${listing._id}`} className="flex-1 text-[#0D47C7] font-semibold truncate hover:underline">
                <p>{listing.title}</p>
              </Link>

              <div className="flex items-center gap-3">
                <button
                  title="Edit"
                  className="p-2 rounded-full bg-blue-50  cursor-pointer  text-[#0D47C7] hover:bg-[#0D47C7] hover:text-white transition duration-200"
                >
                  <CiEdit size={22} />
                </button>
                <button
                  title="Delete"
                  className="p-2 rounded-full bg-red-50 text-red-600
                  cursor-pointer hover:bg-red-600 hover:text-white transition duration-200"
                >
                  <MdDeleteForever size={22} />
                </button>
              </div>
            </div>
          ))
        }
      </div>



    </div >
  )
}

export default ShowListings