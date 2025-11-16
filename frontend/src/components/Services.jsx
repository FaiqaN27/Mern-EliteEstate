import { useState } from "react";
import { FaHome, FaHandshake, FaClock, FaShieldAlt } from "react-icons/fa";

const Services = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const services = [
    {
      title: "Affordable Property Taxes",
      description:
        "We help you find a new home by offering a smart real estate experience",
      icon: <FaHome className="text-5xl" />,
    },
    {
      title: "Guaranteed Quality Homes",
      description:
        "We help you find a new home by offering a smart real estate experience",
      icon: <FaHandshake className="text-5xl" />,
    },
    {
      title: "Fast and Easy Process",
      description:
        "We help you find a new home by offering a smart real estate experience",
      icon: <FaClock className="text-5xl" />,
    },
    {
      title: "Property Insurance",
      description:
        "We help you find a new home by offering a smart real estate experience",
      icon: <FaShieldAlt className="text-5xl" />,
    },
  ];

  return (
    <section className="max-w-7xl p-3 flex flex-col gap-3 my-10 mx-auto">
      <h1 className="text-secondary text-2xl md:text-4xl font-semibold">
        Our Services
      </h1>
      <p className="text-gray-500 text-sm md:text-base mb-4">
        Enhance your property listings with accurate and engaging subtitles.
      </p>

      <div className="flex flex-col lg:flex-row gap-5 mx-auto">
        {services.map((service, i) => {
          const isActive = i === activeIdx;
          return (
            <div
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`p-7 rounded-xl transition-all duration-300 flex flex-col gap-4 justify-center items-center cursor-pointer  ${
                isActive ? "bg-primary" : "bg-light"
              }`}
            >
              <div
                className={`flex ${isActive ? "text-white" : "text-primary"}`}
              >
                {service.icon}
              </div>

              <h3
                className={`text-lg font-semibold ${
                  isActive ? "text-white" : "text-secondary"
                }`}
              >
                {service.title}
              </h3>

              <p
                className={`text-sm ${
                  isActive ? "text-light" : "text-gray-500"
                }`}
              >
                {service.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
