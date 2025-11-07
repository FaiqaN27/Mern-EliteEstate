import {
  FaFacebook,
  FaInstagramSquare,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import {Link} from 'react-router-dom';
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#EAEAF4] p-5 mt-4">
      <div className="flex gap-10 flex-col md:flex-row items-start justify-between max-w-6xl mx-auto p-3">
        <div className="flex flex-col gap-5 w-full md:w-[45%]">
          <Link to="/">
            <h1 className="font-bold text-2xl flex flex-wrap">
              <span className="text-primary">Elite</span>
              <span className="text-grayish">Estate</span>
            </h1>
          </Link>
          <hr className="text-primary" />
          <p className="text-sm font-light leading-relaxed">
            Discover straightforward and efficient real estate solutions with
            <span className="font-semibold"> EliteEstate</span>, where premium
            property meets modern simplicity. We eliminate all unnecessary
            complexity and give you a seamless, transparent journey you can
            trust. Smart choices, smooth process — this is real estate, made
            easy.
          </p>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <a href="https://www.facebook.com/" target="_blank">
              <FaFacebook size={24} className="text-primary" />
            </a>
            <a href="https://www.youtube.com/" target="_blank">
              <FaYoutube size={24} className="text-primary" />
            </a>
            <a href="https://x.com/home" target="_blank">
              <FaTwitter size={24} className="text-primary" />
            </a>
            <a href="https://www.instagram.com/" target="_blank">
              <FaInstagramSquare size={24} className="text-primary" />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 w-full md:w-[20%]">
          <h3 className="text-primary font-semibold text-lg">Quick Links</h3>
          <Link
            to="/about"
            className="text-sm hover:text-primary hover:underline"
          >
            About
          </Link>
          <Link
            to="/service"
            className="text-sm hover:text-primary hover:underline"
          >
            Service
          </Link>
          <Link
            to="/contact"
            className="text-sm hover:text-primary hover:underline"
          >
            Contact
          </Link>
        </div>

        <div className="flex flex-col items-center gap-5 w-full md:w-[30%] md:items-start">
          <h3 className="text-primary font-semibold text-lg">
            Islamabad Office
          </h3>

          <p className="flex items-center gap-2 text-sm font-light md:items-start">
            <MdLocationOn size={18} className="text-primary" />
            House #58, Block E, Defence, Islamabad.
          </p>

          <p className="flex items-center gap-2 text-sm font-light">
            <MdPhone size={18} className="text-primary" />
            +92 333 4122186
          </p>

          <p className="flex items-center gap-2 text-sm font-light">
            <MdEmail size={18} className="text-primary" />
            info@eliteestate.pk
          </p>
        </div>
      </div>

      <hr className="border-t border-gray-300 my-4" />
      <div className="flex items-center justify-center font-light text-sm md:text-lg">
        © {new Date().getFullYear()} EliteEstate Ltd. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
