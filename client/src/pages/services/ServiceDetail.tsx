// import { useParams, Link } from "react-router-dom";
// import { services } from "@/data/services";

// const ServiceDetail = () => {
//   const { slug } = useParams();

//   const service = services.find((s) => s.slug === slug);

//   if (!service) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-center">
//         <div>
//           <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
//           <Link to="/" className="text-blue-600 underline">
//             Go Home
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* ================= HERO ================= */}
//       <section className="relative h-[60vh] bg-black">
//         <img
//           src={service.heroImage}
//           alt={service.title}
//           className="absolute inset-0 w-full h-full object-cover opacity-50"
//         />

//         <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">
//             {service.title}
//           </h1>
//           <p className="max-w-2xl text-gray-200">
//             {service.description}
//           </p>
//         </div>
//       </section>

//       {/* ================= DETAILS ================= */}
//       <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
//         {/* LEFT */}
//         <div>
//           <h2 className="text-3xl font-bold mb-4">
//             What We Offer
//           </h2>

//           <ul className="space-y-3 text-gray-700">
//             {service.features.map((item, i) => (
//               <li key={i}>✔ {item}</li>
//             ))}
//           </ul>
//         </div>

//         {/* RIGHT */}
//         <div className="grid grid-cols-2 gap-4">
//           {service.gallery.map((img, i) => (
//             <img
//               key={i}
//               src={img}
//               className={`rounded-lg object-cover h-48 w-full ${
//                 i === 2 ? "col-span-2" : ""
//               }`}
//             />
//           ))}
//         </div>
//       </section>

//       {/* ================= CTA ================= */}
//       <section className="bg-black text-white py-16 text-center px-4">
//         <h2 className="text-3xl font-bold mb-4">
//           Book {service.title}
//         </h2>
//         <p className="text-gray-300 mb-6">
//           Contact us today and make your event unforgettable.
//         </p>

//         <div className="flex flex-col sm:flex-row justify-center gap-4">
//           <Link
//             to="/contact"
//             className="bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-200"
//           >
//             Contact Us
//           </Link>

//           <a
//             href="tel:+919999999999"
//             className="border border-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-black"
//           >
//             Call Now
//           </a>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ServiceDetail;




import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import ImageDepthParallax from "@/animation/ImageDepthParallax";

const API_URL = "http://localhost:8080";

const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/admin/services/${slug}`)
      .then(res => res.json())
      .then(data => setService(data))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p className="p-10">Loading...</p>;
  if (!service) return <p className="p-10">Service not found</p>;

  return (
    <>
      <div className="min-h-screen">
      {/* HERO */}
      {/* <div className="relative h-[60vh] bg-black">
        <img
          src={service.heroImage}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-10 h-full flex items-center justify-center text-white text-center">
          <div>
            <h1 className="text-5xl font-bold">{service.title}</h1>
            <p className="mt-4 max-w-2xl">{service.description}</p>
          </div>
        </div>
      </div> */}


      {/* ================= SERVICE HERO ================= */}
<section className="relative mt-14 w-full h-[60vh] overflow-hidden">

  {/* 🌿 IMAGE DEPTH PARALLAX */}
  <ImageDepthParallax
    layers={[
      {
        src: service.heroImage,   // background layer
        depth: 10,
        className: "z-0 scale-110",
      },
      {
        src: service.heroImage,   // mid-depth (soft parallax)
        depth: 25,
        className: "z-10 opacity-70",
      },
    ]}
    height="h-[60vh]"
  />

  {/* 🌑 OVERLAY */}
  <div className="absolute inset-0 z-20 bg-black/50" />
  {/* <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/30 via-black/40 to-black/60" /> */}


  {/* ✨ CONTENT */}
  <div className="absolute inset-0 z-30 flex items-center justify-center text-center px-6">
    <div className="max-w-3xl text-white">

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8 }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold drop-shadow-lg"
      >
        {service.title}
    </motion.h1>

     <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.8 }}
      className="mt-6 text-base sm:text-lg text-white/90 leading-relaxed"
     >
      {service.description}
</motion.p>

    </div>
  </div>

</section>


      {/* FEATURES + GALLERY */}
<div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-start">
  {/* LEFT CONTENT */}
  <div>
    <h2 className="text-3xl font-bold mb-4">
      Our {service.title} Decoration Services
    </h2>

    <p className="text-gray-600 mb-6">
      We specialize in premium {service.title} decorations that bring elegance, beauty, and creativity to your special day. From traditional to modern themes, we customize everything according to your taste and budget.
    </p>

    <ul className="space-y-3">
      {service.features.map((f: string, i: number) => (
        <li key={i} className="flex items-center gap-2 text-gray-700">
          <span className="text-purple-600 font-bold">✔</span>
          {f}
        </li>
      ))}
    </ul>
  </div>

  {/* RIGHT GALLERY */}
  <div className="grid grid-cols-2 gap-4">
    {service.gallery.map((img: string, i: number) => (
      <img
        key={i}
        src={img}
        className="rounded-lg h-48 w-full object-cover"
      />
    ))}
  </div>

</div>



      {/* ================= WHY CHOOSE US ================= */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Choose Us?
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-gray-100 p-6 rounded shadow">
              <h3 className="font-semibold mb-2">Experience</h3>
              <p className="text-gray-600 text-sm">
                10+ years of wedding decoration experience.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded shadow">
              <h3 className="font-semibold mb-2">Custom Themes</h3>
              <p className="text-gray-600 text-sm">
                Fully customized wedding designs.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded shadow">
              <h3 className="font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">
                High-quality materials & floral décor.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded shadow">
              <h3 className="font-semibold mb-2">Affordable</h3>
              <p className="text-gray-600 text-sm">
                Best pricing with luxury results.
              </p>
            </div>
          </div>
        </div>
      </section>

          {/* ================= CTA ================= */}
       <section className="bg-white text-black py-16 text-center px-4">
         <h2 className="text-3xl font-bold mb-4">
           Book Your Dream {service.title} Event Now
         </h2>
         <p className="text-gray-500 mb-6">
           Contact us today and make your event unforgettable.
         </p>

         <div className="flex flex-col sm:flex-row justify-center gap-4">
           <Link
             to="/contact"
              className="bg-black text-white border border-black px-6 py-3 rounded font-semibold hover:bg-gray-800"
           >
             Contact Us
           </Link>

           <a
             href="tel:+919999999999"
            //  className="border border-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-black"
              className="border border-black px-6 py-3 rounded font-semibold hover:bg-black hover:text-white"
           >
             Call Now
           </a>
         </div>
       </section>
    </div>
    </>
  );
};

export default ServiceDetail;

