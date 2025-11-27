import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";
import Loader from "../components/Loader";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Listing = () => {
  SwiperCore.use([Navigation]);

  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [listing, setListing] = useState(null);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`${API_BASE_URL}/api/listing/get/${listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          setLoading(false);
          return;
        }
        setError(false);
        setListing(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main className="">
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((image) => (
              <SwiperSlide key={image._id}>
                <div
                  className="h-[550px] bg-center bg-no-repeat bg-cover"
                  style={{
                    backgroundImage: `url(${image.url})`,
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="fixed top-[15%] right-[3%] z-10 rounded-full w-12 h-12 flex justify-center items-center bg-background cursor-pointer">
            <FaShare
              className="text-primary"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>

          {copied && (
            <p className="fixed top-[23%] right-[5%] z-20 bg-primary text-white text-sm px-3 py-1 rounded-md shadow-md">
              Link copied!
            </p>
          )}

          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="font-semibold text-2xl">
              {listing.title} - ${" "}
              {listing.offer
                ? listing.discountedPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>
            <p className="flex items-center gap-2 my-2 text-sm">
              <FaMapMarkerAlt className="text-primary" size={22} />
              {listing.address}
            </p>

            <div className="flex gap-4">
              <p className="bg-danger w-full max-w-[200px] text-white text-center p-1 rounded-md font-semibold">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-action w-full max-w-[200px] text-white text-center p-1 rounded-md font-semibold">
                  ${" "}
                  {(
                    listing.regularPrice - listing.discountedPrice
                  ).toLocaleString("en-US")}{" "}
                  OFF
                </p>
              )}
            </div>

            <p className="text-secondary leading-relaxed">
              <span className="text-black font-bold">Description - </span>
              {listing.description}
            </p>

            <ul className="flex flex-wrap items-center gap-4 font-semibold sm:gap-6 text-primary text-sm">
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBed size={18} />
                {listing.bedrooms}
                {listing.bedrooms > 1 ? " Beds" : " Bed"}
              </li>

              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBath size={18} />
                {listing.bathrooms}
                {listing.bathrooms > 1 ? " Bath" : " Bath"}
              </li>

              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaParking size={18} />
                {listing.parking ? " Parking" : " No parking"}
              </li>

              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaChair size={18} />
                {listing.furnished ? " Furnished" : " Not Furnished"}
              </li>
            </ul>

            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                className="bg-primary rounded-lg uppercase text-white font-semibold p-3 hover:opacity-90 cursor-pointer mt-5"
                onClick={() => setContact(true)}
              >
                Contact LandLord
              </button>
            )}

            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}

      {loading && <Loader />}
      {error && (
        <p className="text-center text-2xl text-danger mt-7">
          Something went wrong
        </p>
      )}
    </main>
  );
};

export default Listing;
