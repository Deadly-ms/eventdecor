import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:8080";

// 🔹 how many images to show on HOME
const PREVIEW_LIMIT = 17;

type ImageDoc = {
  _id: string;
  title: string;
  category: string;
  url: string;
};

const GalleryPreview = () => {
  const [images, setImages] = useState<ImageDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      const res = await fetch(`${API_URL}/api/images`);
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error("Gallery fetch error", err);
    } finally {
      setLoading(false);
    }
  }

  // 🔹 LIMIT IMAGES FOR HOME PREVIEW
  const previewImages = images.slice(0, PREVIEW_LIMIT);

  return (
    <section className="bg-white px-6 py-20">
      <div className="max-w-7xl mx-auto">

        {/* ================= HEADING ================= */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Event Gallery</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A glimpse of our elegant event decorations crafted with creativity,
            precision, and luxury styling.
          </p>
        </div>

        {/* ================= LOADING ================= */}
        {loading && (
          <p className="text-center text-gray-500">
            Loading gallery…
          </p>
        )}

        {/* ================= GRID ================= */}
        {!loading && (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
            {previewImages.map((img) => (
              <div
                key={img._id}
                className="mb-6 break-inside-avoid group"
              >
                <div className="relative overflow-hidden rounded-xl shadow hover:shadow-2xl transition">

                  {/* IMAGE */}
                  <img
                    src={img.url}
                    alt={img.title}
                    loading="lazy"
                    className="w-full object-cover group-hover:scale-105 transition duration-300"
                  />

                  {/* OVERLAY */}
                  <div className="
                    absolute inset-0
                    bg-gradient-to-t from-black/70 via-black/30 to-transparent
                    opacity-0 group-hover:opacity-100
                    transition duration-300
                  " />

                  {/* TEXT */}
                  <div className="
                    absolute bottom-0 left-0 right-0 p-4
                    translate-y-6 opacity-0
                    group-hover:translate-y-0 group-hover:opacity-100
                    transition-all duration-300
                  ">
                    <h3 className="text-white font-semibold text-sm">
                      {img.title}
                    </h3>
                    <p className="text-gray-300 text-xs capitalize">
                      {img.category}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}






<p className="text-center text-gray-500 text-sm mt-15">
  Discover the artistry behind our celebrations
</p>

        {/* ================= CTA ================= */}
        {!loading && images.length > PREVIEW_LIMIT && (
          <div className="flex justify-center mt-7">
            <Link
              to="/gallery"
              className="
                px-10 py-3
                rounded-full
                border border-black
                text-black
                text-sm font-medium tracking-wide
                hover:bg-black hover:text-white
                transition duration-300
              "
            >
              View Full Gallery →
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};

export default GalleryPreview;
