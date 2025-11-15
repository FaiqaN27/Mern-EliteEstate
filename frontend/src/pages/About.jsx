import { FaHandshake, FaRegLightbulb, FaUserTie } from "react-icons/fa";

const About = () => {
  return (
    <div>
      {/* HERO SECTION */}
      <section
        className="relative h-[70vh] bg-cover bg-center flex items-center px-6 md:px-12 lg:px-20 text-white"
        style={{ backgroundImage: "url('/about_banner.png')" }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-black/55"></div>

        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg leading-tight">
            About Us
          </h1>

          <h3 className="mt-4 capitalize text-md md:text-xl drop-shadow-md">
            Turning property decisions into confident choices
          </h3>

          <p className="mt-4 text-sm md:text-lg font-light leading-relaxed drop-shadow-md">
            At <span className="font-semibold">EliteEstate</span>, we connect
            people with homes that match their lifestyle, budget, and dreams. We
            bring trust, comfort, and clarity to your property journey.
          </p>
        </div>
      </section>

      {/* --- OUR STORY SECTION --- */}
      <section className="p-4 max-w-lg md:max-w-6xl mx-auto my-5 md:my-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <img
            src="/about.png"
            alt="Our Story"
            className="rounded-lg shadow-md"
          />

          <div className="flex flex-col gap-7">
            <h2 className="text-secondary capitalize font-bold text-3xl md:text-4xl">
              Our Story
            </h2>
            <p className="text-gray-600 text-justify leading-relaxed">
              <span className="font-semibold">EliteEstate</span> was founded
              with a simple mission: to make real estate transparent, reliable,
              and stress-free for everyone. Over the years, we have helped
              countless families, investors, and first-time buyers navigate the
              property market with confidence and ease. Guided by integrity,
              expertise, and a client-first approach, our team ensures that
              every decision is well-informed and every transaction is smooth.
              From property search to closing the deal, we handle all the
              details so that our clients can focus on finding a space that
              truly feels like home. At{" "}
              <span className="font-semibold">EliteEstate</span>, your goals are
              our priority, and your trust is our most valued asset.
            </p>
          </div>
        </div>
      </section>

      {/* WHY US SECTION */}
      <section className="p-4 max-w-lg md:max-w-6xl mx-auto flex flex-col gap-8 justify-center items-center">
        <h1 className="text-secondary capitalize font-bold text-3xl md:text-4xl">
          Why choose EliteEsate?
        </h1>
        <p className="text-gray-600 leading-relaxed text-justify">
          At <span className="font-semibold">EliteEstate</span>, we believe that
          real estate should never be complicated or overwhelming. Our mission
          is to provide every client with a seamless, transparent, and
          trustworthy property experience. Whether you are buying your first
          home, investing in a property, or selling your current space, we guide
          you with expert advice, market insights, and dedicated support. Our
          team prioritizes honesty and integrity, ensuring that every decision
          you make is well-informed and stress-free. With years of industry
          experience and countless satisfied clients,{" "}
          <span className="font-semibold">EliteEstate</span> combines
          professionalism with personalized service — making us the go-to choice
          for anyone looking to navigate the real estate market with confidence.
          From start to finish, we handle all the details, so you can focus on
          finding a space that truly feels like home.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="border-3 border-background shadow-md rounded-xl p-6 flex flex-col items-center text-center">
            <FaHandshake className="text-5xl text-primary mb-4" />
            <h4 className="text-xl font-semibold mb-2 text-gray-800">
              Trusted Service
            </h4>
            <p className="text-gray-600">
              Transparent and honest guidance every step of the way.
            </p>
          </div>

          {/* Card 2 */}
          <div className="border-3 border-background shadow-md rounded-xl p-6 flex flex-col items-center text-center">
            <FaRegLightbulb className="text-5xl text-yellow-500 mb-4" />
            <h4 className="text-xl font-semibold mb-2 text-gray-800">
              Smooth Process
            </h4>
            <p className="text-gray-600">
              From site visits to paperwork — we handle everything smoothly.
            </p>
          </div>

          {/* Card 3 */}
          <div className="border-3 border-background shadow-md rounded-xl p-6 flex flex-col items-center text-center">
            <FaUserTie className="text-5xl text-green-500 mb-4" />
            <h4 className="text-xl font-semibold mb-2 text-gray-800">
              Expert Support
            </h4>
            <p className="text-gray-600">
              Professional advice to help you make the best decision.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
