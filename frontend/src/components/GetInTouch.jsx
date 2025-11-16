import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

const GetInTouch = () => {
  return (
    <div>
      <section className="p-4 max-w-7xl mx-auto my-7">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-secondary font-semibold text-2xl md:text-4xl my-5">
              Get In Touch
            </h2>
            <p className="text-gray-600 text-sm md:text-lg font-light leading-relaxed">
              We are here to support all your real estate needs. Wheather you
              have inquires, need further details, or ready to begin your
              investment journey, our team is just a phone call or email away.
            </p>

            <div className="space-y-4 mt-4">
              <h3 className="text-secondary font-semibold text-lg">Address</h3>
              <p className="flex items-center gap-4 font-light text-secondarys">
                <MdLocationOn size={28} className="text-primary" />
                House #58, Block E, Defence, Islamabad.
              </p>

              <h3 className="text-secondary font-semibold text-lg">Contact</h3>
              <p className="flex items-center gap-4 font-light text-secondarys">
                <MdPhone size={28} className="text-primary" />
                +92 333 4122186
              </p>

              <h3 className="text-secondary font-semibold text-lg">Email</h3>
              <p className="flex items-center gap-4 font-light text-secondarys">
                <MdEmail size={28} className="text-primary" />
                info@eliteestate.pk
              </p>
            </div>
          </div>

          <div className="w-full h-96 md:h-full rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="EliteEstate Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.307891317001!2d73.05511557531436!3d33.70859248071542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df951ec689a2b3%3A0x24e55e4fbbad7e6!2sF-10%20Markaz%2C%20Islamabad%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700062000000!5m2!1sen!2s"
              height="100%"
              width="100%"
              className="border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInTouch;
