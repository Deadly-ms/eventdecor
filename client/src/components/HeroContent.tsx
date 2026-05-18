import { Link } from "react-router-dom";
import ImageDepthParallax from "@/animation/ImageDepthParallax";

const HeroContent = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">

      {/* 🌿 IMAGE DEPTH PARALLAX */}
      <ImageDepthParallax
        layers={[
          {
            src: "/src/assets/img333.jpg", // background
            depth: 10,
            className: "z-0 scale-110",
          },
          {
            src: "/src/assets/img333.jpg", // subtle mid depth (reuse or add blur image)
            depth: 25,
            className: "z-10 opacity-70",
          },
        ]}
        height="min-h-screen"
      />

      {/* 🌑 GLASS OVERLAY */}
      <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-sm" />

      {/* ✨ HERO CONTENT */}
      <div className="absolute inset-0 z-30 flex items-center justify-center px-4 sm:px-10 md:px-20 lg:px-32">
        <div className="text-center max-w-3xl">

          {/* <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            PlantFashion
          </h1> */}

          <h1 className="font-italiano text-7xl md:text-8xl text-white">
            PlantFashion
</h1>

          <p id="font-p" className="text-[15px] sm:text-[15px] md:text-[17px] text-white/90 leading-[1] tracking-wide font-light">
            We design beautiful event decorations that turn your special moments
            into lasting memories. With thoughtful details and natural elegance,
            we bring your vision to life—perfectly and effortlessly.
          </p>

          {/* <div className="flex flex-wrap gap-4 mt-10 justify-center">
            <Link
              to="/About"
              className="px-6 py-3 bg-white text-gray-900 font-medium rounded-xl hover:scale-105 transition"
            >
              Learn More
            </Link>

            <Link
              to="/Contact"

              className="px-6 py-3 border border-white text-white font-medium rounded-xl hover:bg-white/10 transition"
            >
              Contact Us
            </Link>
          </div> */}
        </div>
      </div>

    </section>
  );
};

export default HeroContent;
