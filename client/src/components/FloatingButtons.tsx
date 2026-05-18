import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">

      {/* Call Button */}
      {/* <a
        href="tel:+919876543210"
        className="w-14 h-14 flex items-center justify-center rounded-full bg-black text-white shadow-lg hover:scale-110 transition"
        aria-label="Call Now"
      >
        <FaPhoneAlt size={22} />
      </a> */}

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919876543210?text=Hi%20PlantFashion,%20I%20want%20to%20plan%20an%20event"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:scale-110 transition"
        aria-label="WhatsApp Chat"
      >
        <FaWhatsapp size={24} />
      </a>

    </div>
  );
};

export default FloatingButtons;
