import GetInTouch from "../components/GetInTouch";

const Contact = () => {
  return (
    <div>
      {/* HERO SECTION */}
      <section
        className="relative h-[70vh] bg-cover bg-center flex items-center px-6 md:px-12 lg:px-20 text-white"
        style={{ backgroundImage: "url('/contact_banner.png')" }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg leading-tight">
            Contact Us
          </h1>

          <p className="mt-4 text-sm md:text-lg font-light leading-relaxed drop-shadow-md">
            Have questions about a property? Reach out to us today — we are here
            to help!
          </p>
        </div>
      </section>

      <GetInTouch />
    </div>
  );
};

export default Contact;
