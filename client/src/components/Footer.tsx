import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gray-600 text-white overflow-hidden">

      {/* ✅ Decorative Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/10 via-transparent to-rose-400/10 blur-3xl" />

      {/* ✅ Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-20 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* ✅ Brand */}
        <div>
          <h2 className="text-2xl font-bold tracking-wide">PlantFashion</h2>
          <p className="text-white/70 mt-4 leading-relaxed">
            We design beautiful event decorations that turn your special moments into lasting memories.
          </p>

          {/* ✅ Social Icons */}
          <div className="flex gap-4 mt-6">
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white hover:text-black transition">
              <Facebook size={18} />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white hover:text-black transition">
              <Instagram size={18} />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white hover:text-black transition">
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/* ✅ Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-white/80">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/About" className="hover:text-white transition">About</Link></li>
            <li><Link to="/Gallery" className="hover:text-white transition">Gallery</Link></li>
            <li><Link to="/Contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* ✅ Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Our Services</h3>
          <Link to="/Services">
            <ul className="space-y-3 text-white/80">
              <li>Wedding Decoration</li>
              <li>Birthday Party</li>
              <li>Corporate Events</li>
              <li>Flower & Plant Styling</li>
              <li>Stage & Lighting Decoration</li>
            </ul>
          </Link>
        </div>

        {/* ✅ Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-4 text-white/80">
            <li className="flex items-center gap-2">
              <Phone size={16} /> +91 9876543210
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> plantfashion@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Coimbatore, Tamil Nadu
            </li>
          </ul>
        </div>

      </div>

      {/* ✅ Bottom Bar */}
      <div className="border-t border-white/10 py-5 text-center text-white/60 text-sm relative z-10">
        © {new Date().getFullYear()} PlantFashion. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
