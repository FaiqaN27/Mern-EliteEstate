import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();

        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLandlord();
  }, [listing.userRef]);
  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-5 mt-4">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.title.toLowerCase()}</span>
          </p>

          <textarea
            name="message"
            id="message"
            rows={3}
            value={message}
            onChange={handleChange}
            placeholder="Enter your message here ..."
            className="bg-[#D6E6FF] w-full p-3 rounded-lg focus:outline-none"
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=${encodeURIComponent(`Regarding ${listing.title}`)}&body= ${encodeURIComponent(message)}`}
            className="bg-[#0D47C7] p-3 uppercase rounded-lg text-white font-semibold text-center hover:opacity-90"
          >
            Send Message
          </Link>
        </div >
      )}
    </>
  );
};

export default Contact;
