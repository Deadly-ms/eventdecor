import { Link } from "react-router-dom";

const AboutPreview = () => {
  return (
    <>
        <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-20 grid md:grid-cols-2 gap-20 items-center">

          {/* Left Image */}
          <div className="relative">
            <img
              src="/src/assets/img5.jpg"   // ✅ Replace with your image
              alt="About PlantFashion"
              className="w-full h-[500px] object-cover rounded-sm"
            />
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gray-200 -z-10"></div>
          </div>

          {/* Right Content */}
          <div className="relative">

            {/* Background Number */}
            {/* <h1 className="absolute -top-24 right-0 text-[140px] font-bold text-gray-100 select-none">
              01
            </h1> */}

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
    </>
  )
}

export default AboutPreview;