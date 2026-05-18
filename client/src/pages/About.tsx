import { Link } from "react-router-dom";
// import TrustStats from "@/components/TrustStats";
import AboutTrustStats from "@/components/AboutTrustStats";
import TestimonialSlider from "@/components/TestimonialSlider";
import Footer from "@/components/Footer";

import ParallaxSection from "@/animation/ParallaxSection";


const About = () => {
  return (
   <>
      <main className="bg-white">
      {/* ================= ABOUT HERO ================= */}
      <ParallaxSection>
      <section className="py-28 mt-10">
        <div className="max-w-7xl mx-auto px-6 md:px-20 grid md:grid-cols-2 gap-20 items-center">

          {/* Left Image */}
          <div className="relative">
            <img
              src="/src/assets/img2.jpg"   // ✅ Replace with your image
              alt="About PlantFashion"
              className="w-full h-[500px] object-cover rounded-sm"
            />
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gray-100 -z-10"></div>
          </div>

          {/* Right Content */}
          <div className="relative">

            {/* Background Number */}
            <h1 className="absolute -top-24 right-0 text-[140px] font-bold text-gray-100 select-none">
              01
            </h1>
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">
              Who We Are
            </p>


            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Great Events <br /> Start Together
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              PlantFashion is a premium event decoration brand specializing in
              luxury floral styling, wedding décor, corporate setups, and custom
              event transformations. We blend creativity, craftsmanship, and
              precision to deliver unforgettable visual experiences.
            </p>


            <p className="text-gray-600 leading-relaxed mb-8">
              From intimate celebrations to grand-scale productions, our
              dedication to quality and detail makes every moment extraordinary.
            </p>

            <Link
              to="/Contact"
              className="inline-block px-8 py-3 border border-black text-black font-medium hover:bg-black hover:text-white transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      </ParallaxSection>

      {/* ================= VISION & MISSION ================= */}
      <ParallaxSection>
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-20">

          {/* Title */}
          <div className="relative mb-30">
            <h1 className="absolute -top-60 left-0 text-[140px] font-bold text-gray-100 select-none">
              02
            </h1>

            <p className="absolute -top-28 right-0 text-sm uppercase tracking-widest text-gray-500 mb-4">
              Our Purpose
            </p>

            <h2 className="absolute -top-20 right-0 text-4xl md:text-5xl font-bold leading-tight">
              Vision & Mission
            </h2>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-16">

            {/* Vision */}
            <div className="bg-gray-50 p-10 shadow-sm hover:bg-gray-100 shadow-md transition-shadow">
              <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become a leading luxury event decoration brand known for
                innovative designs, premium quality, and memorable customer
                experiences across all celebrations.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-gray-50 p-10 shadow-sm hover:bg-gray-100 shadow-md transition-shadow">
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To transform every event into an emotional and visual
                masterpiece through creativity, precision, and professional
                execution.
              </p>
            </div>

          </div>
        </div>
      </section>
      </ParallaxSection>

      {/* ================= WHY CHOOSE US ================= */}
      <ParallaxSection>
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-20">

          {/* Title */}
          <div className="relative mb-10">
            <h1 className="absolute -top-24 right-0 text-[140px] font-bold text-gray-100 select-none">
              03
            </h1>

            <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">
              Our Strength
            </p>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Why Choose <br /> PlantFashion
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-16">

            <div className="bg-gray-50 p-10">
              <h3 className="text-xl font-semibold mb-3">
                Premium Quality Materials
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-md">
                We use hand-picked flowers, luxury fabrics, premium lighting,
                and high-end décor elements.
              </p>
            </div>

            <div className="bg-gray-50 p-10">
              <h3 className="text-xl font-semibold mb-3">
                Customized Design Concepts
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-md">
                Every setup is uniquely tailored to your theme, space, and
                personal style.
              </p>
            </div>

            <div className="bg-gray-50 p-10">
              <h3 className="text-xl font-semibold mb-3">
                Experienced Creative Team
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-md">
                Our decorators, designers, and technicians bring years of
                hands-on professional expertise.
              </p>
            </div>

            <div className="bg-gray-50 p-10">
              <h3 className="text-xl font-semibold mb-3">
                End-to-End Event Execution
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-md">
                We handle everything from concept planning to final execution
                without stress for you.
              </p>
            </div>

          </div>
        </div>
      </section>
      </ParallaxSection>

 {/* #############################- Testimonialslider -####################### */}

 <ParallaxSection>
      <TestimonialSlider />
  </ParallaxSection>
      

 {/* #############################- Stats -####################### */}

        <ParallaxSection>
          {/* <TrustStats /> */}
          <AboutTrustStats />
        </ParallaxSection>

    </main>

 {/* #############################- Footer -####################### */}

 {/* <ParallaxSection> */}
           <Footer />
        {/* </ParallaxSection> */}

    </>

  );
};

export default About; 









// import { Link } from "react-router-dom";
// import TrustStats from "@/components/TrustStats";
// import TestimonialSlider from "@/components/TestimonialSlider";
// import Footer from "@/components/Footer";
// import ParallaxSection from "@/components/ParallaxSection";

// const About = () => {
//   return (
//     <>
//       <main className="bg-white">

//         {/* ================= ABOUT HERO ================= */}
//         <ParallaxSection>
//           <section className="py-28">
//             <div className="max-w-7xl mx-auto px-6 md:px-20 grid md:grid-cols-2 gap-20 items-center">

//               {/* Left Image (Parallax feels premium here) */}
//               <div className="relative">
//                 <img
//                   src="/src/assets/img7.jpg"
//                   alt="About PlantFashion"
//                   className="w-full h-[500px] object-cover rounded-sm"
//                 />
//                 <div className="absolute -top-10 -left-10 w-40 h-40 bg-gray-100 -z-10"></div>
//               </div>

//               {/* Right Content */}
//               <div className="relative">
//                 <h1 className="absolute -top-24 right-0 text-[140px] font-bold text-gray-100 select-none">
//                   01
//                 </h1>

//                 <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">
//                   Who We Are
//                 </p>

//                 <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
//                   Great Events <br /> Start Together
//                 </h2>

//                 <p className="text-gray-600 leading-relaxed mb-6">
//                   PlantFashion is a premium event decoration brand specializing in
//                   luxury floral styling, wedding décor, corporate setups, and custom
//                   event transformations.
//                 </p>

//                 <p className="text-gray-600 leading-relaxed mb-8">
//                   From intimate celebrations to grand-scale productions, our
//                   dedication to quality and detail makes every moment extraordinary.
//                 </p>

//                 <Link
//                   to="/Contact"
//                   className="inline-block px-8 py-3 border border-black text-black font-medium hover:bg-black hover:text-white transition"
//                 >
//                   Work With Us
//                 </Link>
//               </div>
//             </div>
//           </section>
//         </ParallaxSection>

//         {/* ================= VISION & MISSION ================= */}
//         <ParallaxSection>
//           <section className="bg-white py-28">
//             <div className="max-w-7xl mx-auto px-6 md:px-20">

//               <div className="relative mb-24">
//                 <h1 className="absolute -top-40 left-0 text-[140px] font-bold text-gray-100 select-none">
//                   02
//                 </h1>

//                 <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">
//                   Our Purpose
//                 </p>

//                 <h2 className="text-4xl md:text-5xl font-bold leading-tight">
//                   Vision & Mission
//                 </h2>
//               </div>

//               <div className="grid md:grid-cols-2 gap-16">
//                 <div className="bg-gray-50 p-10 hover:bg-gray-100 transition">
//                   <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
//                   <p className="text-gray-600 leading-relaxed">
//                     To become a leading luxury event decoration brand known for
//                     innovative designs and memorable customer experiences.
//                   </p>
//                 </div>

//                 <div className="bg-gray-50 p-10 hover:bg-gray-100 transition">
//                   <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
//                   <p className="text-gray-600 leading-relaxed">
//                     To transform every event into an emotional and visual
//                     masterpiece through creativity and precision.
//                   </p>
//                 </div>
//               </div>

//             </div>
//           </section>
//         </ParallaxSection>

//         {/* ================= WHY CHOOSE US ================= */}
//         <ParallaxSection>
//           <section className="bg-white py-28">
//             <div className="max-w-7xl mx-auto px-6 md:px-20">

//               <div className="relative mb-20">
//                 <h1 className="absolute -top-24 right-0 text-[140px] font-bold text-gray-100 select-none">
//                   03
//                 </h1>

//                 <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">
//                   Our Strength
//                 </p>

//                 <h2 className="text-4xl md:text-5xl font-bold leading-tight">
//                   Why Choose <br /> PlantFashion
//                 </h2>
//               </div>

//               <div className="grid md:grid-cols-2 gap-16">
//                 {[
//                   ["Premium Quality Materials", "Hand-picked flowers, luxury fabrics and high-end décor."],
//                   ["Customized Design Concepts", "Every setup tailored to your theme and style."],
//                   ["Experienced Creative Team", "Years of professional, hands-on expertise."],
//                   ["End-to-End Execution", "From concept to completion, stress-free."]
//                 ].map(([title, desc]) => (
//                   <div key={title} className="bg-gray-50 p-10">
//                     <h3 className="text-xl font-semibold mb-3">{title}</h3>
//                     <p className="text-gray-600 leading-relaxed max-w-md">
//                       {desc}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//             </div>
//           </section>
//         </ParallaxSection>

//         {/* ================= TESTIMONIALS ================= */}
//         <ParallaxSection>
//           <TestimonialSlider />
//         </ParallaxSection>

//         {/* ================= STATS ================= */}
//         <ParallaxSection>
//           <TrustStats />
//         </ParallaxSection>

//       </main>

//       <Footer />
//     </>
//   );
// };

// export default About;
