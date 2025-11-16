import { Link } from "react-router-dom";
import Services from "../components/Services";
import GetInTouch from "../components/GetInTouch";
import { useEffect, useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import ListingCard from "../components/ListingCard";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListings();
  }, []);
  return (
    <div>
      {/* HERO SECTION */}
      <section
        className="h-[70vh] bg-cover bg-center flex flex-col justify-center items-center text-white text-center px-4"
        style={{ backgroundImage: "url('/banner.png')" }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
          Discover Your Dream Property
        </h1>
        <p className="text-sm md:text-xl font-light leading-relaxed max-w-2xl drop-shadow-md">
          Smart choices, smooth process — real estate made easy with EliteEstate
        </p>
        <Link
          to={"/search"}
          className="mt-6 bg-primary px-6 py-2 font-semibold rounded-full cursor-pointer"
        >
          Explore now
        </Link>
      </section>

      {/* LATEST OFFER SECTION */}
      <div className="max-w-7xl mx-auto p-3 my-10">
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-secondary text-2xl md:text-4xl text-center font-semibold">
                Latest Offers
              </h1>
              <Link to={"/search?offer=true"}>
                <p className="flex items-center font-bold gap-2 text-primary text-sm hover:underline ">
                  Show more{" "}
                  <IoArrowForward size={18} className="text-primary" />
                </p>
              </Link>
            </div>
            <p className="text-gray-500 text-sm md:text-base mb-4">
              Find the best discounted options available right now.
            </p>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SALE OFFERS SECTION */}
      <div className="max-w-7xl mx-auto p-3 my-10">
        {saleListings && saleListings.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-secondary text-2xl md:text-4xl text-center font-semibold">
                Latest Sale Offers
              </h1>
              <Link to={"/search?type=sale"}>
                <p className="flex items-center font-bold gap-2 text-primary text-sm hover:underline">
                  Show more{" "}
                  <IoArrowForward size={18} className="text-primary" />
                </p>
              </Link>
            </div>
            <p className="text-gray-500 mb-4 text-sm md:text-base">
              Explore newly listed properties available for purchase.
            </p>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RENT OFFERS SECTION */}
      <div className="max-w-7xl mx-auto p-3 my-10">
        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-secondary text-2xl md:text-4xl text-center font-semibold">
                Latest Rent Offers
              </h1>
              <Link to={"/search?type=rent"}>
                <p className="flex items-center font-bold gap-2 text-primary text-sm hover:underline">
                  Show more{" "}
                  <IoArrowForward size={18} className="text-primary" />
                </p>
              </Link>
            </div>
            <p className="text-gray-500 text-sm md:text-base mb-4">
              Find comfortable and affordable rental options near you.
            </p>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SERVICE SECTION */}
      <Services />

      {/* CONTACT SECTION */}
      <GetInTouch />
    </div>
  );
};

export default Home;
