const CreateListing = () => {
  return (
    <main className="max-w-4xl mx-auto p-3 mb-12">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>

      <form className="flex flex-col sm:flex-row gap-4">

        <div className="flex flex-col gap-5 flex-1">
          <input
            id="name"
            placeholder="Name"
            type="text"
            className="bg-[#D6E6FF] p-3 rounded-lg focus:outline-none"
            maxLength="62"
            minLength="10"
            required
          />

          <textarea
            id="description"
            placeholder="Description"
            type="text"
            className="bg-[#D6E6FF] p-3 rounded-lg focus:outline-none"
            required
          />

          <input
            id="address"
            placeholder="Address"
            type="text"
            className="bg-[#D6E6FF] p-3 rounded-lg focus:outline-none"
            required
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking spot</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 bg-[#D6E6FF] rounded-lg focus:outline-none"
                id="bedrooms"
                min="1"
                max="10"
                required
              />
              <p>Beds</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 bg-[#D6E6FF] rounded-lg focus:outline-none"
                id="bathrooms"
                min="1"
                max="10"
              />
              <p>Baths</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 bg-[#D6E6FF] rounded-lg focus:outline-none"
                min="1"
                max="100000"
                id="regularPrice"
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs">($ / Month)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 bg-[#D6E6FF] rounded-lg focus:outline-none"
                min="1"
                max="100000"
                id="discountedPrice"
              />
              <div className="flex flex-col items-center">
                <p>Discounted price</p>
                <span className="text-xs">($ / Month)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">

          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-[#D6E6FF] rounded-lg w-full cursor-pointer"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />

            <button type="button"
              className="p-3 cursor-pointer border border-[#D6E6FF] rounded-lg hover:shadow-lg disabled:opacity-80 hover:bg-[#D6E6FF]">
              Upload
            </button>
          </div>

          <button className='bg-[#0D47C7] p-3 rounded-lg uppercase text-white font-semibold cursor-pointer hover:opacity-90 disabled:opacity-80'>Create Listing</button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
