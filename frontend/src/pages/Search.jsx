const Search = () => {
  return (
    <div className="flex flex-col md:flex-row">

      <div className="p-7 border-b-2 border-[#D6E6FF] md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-7">
          <div className="flex items-center gap-2">
            <label className="font-semibold whitespace-nowrap">Search Term:</label>
            <input type="text" id="searchTerm"
              placeholder="search ..."
              className="bg-[#D6E6FF] p-3 rounded-lg w-full focus:outline-none" />
          </div>

          <div className="flex flex-wrap gap-2">
            <label className="font-semibold">Type:</label>

            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-5" />
              <span>Rate & Sale</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sale</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <label className="font-semibold">Amenities:</label>

            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="font-semibold">Sort: </label>
            <select id="sort_order" className="w-full bg-[#D6E6FF] p-3 rounded-lg focus:outline-none">
              <option>Price high to low</option>
              <option>Price low to high</option>
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>

          <button className="w-full bg-[#0D47C7] uppercase font-semibold text-white p-3 rounded-lg cursor-pointer hover:opacity-90">Search</button>
        </form>
      </div>

      <div className="">
        <h1 className="text-3xl font-semibold p-3 border-[#D6E6FF] border-b-2 mt-5">Listing results:</h1>
      </div>
    </div>
  )
}

export default Search