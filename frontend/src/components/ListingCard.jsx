import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

const ListingCard = ({ listing }) => {
  return (
    <div className="bg-white border border-light shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl w-full sm:w-[300px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0].url}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />

        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="text-lg font-semibold truncate text-primary">
            {listing.title}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="text-primary" size={18} />
            <p className="text-sm text-secondarys truncate">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-secondary line-clamp-2">
            {listing.description}
          </p>
          <p className="text-sm text-secondary font-semibold">
            ${" "}
            {listing.offer
              ? listing.discountedPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && " / month"}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;
