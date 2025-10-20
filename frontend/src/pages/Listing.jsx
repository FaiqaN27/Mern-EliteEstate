import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

const Listing = () => {
  SwiperCore.use([Navigation]);

  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      }
      catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchListing();
  }, [params.listingId])

  return (
    <main className=''>
      {listing && !loading && !error && <>
        <Swiper navigation>
          {
            listing.imageUrls.map((image) => (
              <SwiperSlide key={image._id}>
                <div className='h-[550px] bg-center bg-no-repeat bg-cover'
                  style={{
                    backgroundImage: `url(${image.url})`
                  }}></div>
              </SwiperSlide>
            ))
          }
        </Swiper>
        <h1 className='font-semibold text-2xl'>{listing.title}</h1>
      </>
      }


      {
        loading && (
          <div className="flex justify-center items-center h-screen">
            <div className="w-12 h-12 border-4 border-[#0D47C7] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )
      }
      {
        error && (
          <p className="text-center text-2xl text-red-600 mt-7">Something went wrong</p>
        )
      }
    </main>
  )
}

export default Listing