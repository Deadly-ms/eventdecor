import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import Navbar from "./Navbar";
import CardImageParallax from "@/animation/CardImageParallax";

const API_URL = "http://localhost:8080";

const ServicePage = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/admin/services`)
      .then(res => res.json())
      .then(data => setServices(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>

        {/* <Navbar /> */}


      <div className="min-h-screen">
      {/* ================= HERO ================= */}
      <section className="text-black py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Our Services
        </h1>
        <p className="max-w-2xl mx-auto text-black/80">
          We provide professional decoration services for weddings, parties,
          birthdays, and corporate events with premium quality.
        </p>
      </section>

      {/* ================= SERVICES ================= */}
      {/* <section className="max-w-7xl mx-auto px-6 py-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading services...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <Link
                key={service._id}
                to={`/services/${service.slug}`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden">


                  <div className="h-48 overflow-hidden">
                    <img
                      src={service.heroImage}
                      alt={service.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>


                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {service.description.slice(0, 90)}...
                    </p>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        )}
      </section> */}


      <section className="max-w-7xl mx-auto px-6 py-6">
  {loading ? (
    <p className="text-center text-gray-500">Loading services...</p>
  ) : (
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
  {services.map(service => (
    <Link
      key={service._id}
      to={`/services/${service.slug}`}
      className="group h-full"
    >
      <div className="
        bg-white
        rounded-2xl
        shadow
        hover:shadow-xl
        transition
        overflow-hidden
        h-[300px]
        sm:h-[350px]
        flex
        flex-col
      ">

        {/* PARALLAX IMAGE */}
        <CardImageParallax
          src={service.heroImage}
          alt={service.title}
        />

        {/* CONTENT */}
        <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 text-center">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              {service.title}
            </h3>

            <p className="text-gray-600 text-sm line-clamp-2 sm:line-clamp-3">
              {service.description}
            </p>
          </div>
        </div>

      </div>
    </Link>
  ))}
</div>
  )}
</section>


      {/* ================= CTA ================= */}
      <section className="bg-white text-black py-16 text-center px-4">
        <h2 className="text-3xl font-bold mb-4">
          Make Your Event Memorable
        </h2>
        <p className="text-gray-600 mb-6">
          Contact us today to get the best decoration services at affordable prices.
        </p>
        <Link
             to="/contact"
              className="bg-black text-white border border-black px-6 py-3 rounded font-semibold hover:bg-gray-800"
           >
             Contact Us
           </Link>

           <a
             href="tel:+919999999999"
            //  className="border border-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-black"
              className="ml-4 border border-black px-6 py-3 rounded font-semibold hover:bg-black hover:text-white"
           >
             Call Now
           </a>
      </section>
    </div>
    </>
  );
};

export default ServicePage;
