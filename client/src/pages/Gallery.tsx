import { useEffect, useState } from "react";
import { useMemo } from "react";
// import { Helmet } from "react-helmet-async";


import Footer from "@/components/Footer";

const API_URL = "http://localhost:8080";

type ImageDoc = {
  _id: string;
  title: string;
  category: string;
  url: string;
};

// const categories = ["all", "wedding", "birthday", "party", "corporate"];


const Gallery = () => {
  const [images, setImages] = useState<ImageDoc[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  // *******************************************************************
  const categories = useMemo(() => {
    return [
      "all",
      ...Array.from(new Set(images.map(img => img.category)))
    ];
  }, [images]);



  // Lightbox
  const [lightboxImg, setLightboxImg] = useState<ImageDoc | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxImg(null);
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
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

  const filteredImages =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory);

  return (
    <>
      {/* 🔍 SEO */}
      {/* <Helmet>
        <title>Event Gallery | Wedding, Birthday & Party Decoration</title>
        <meta
          name="description"
          content="Browse our event decoration gallery featuring weddings, birthday parties, corporate events and more."
        />
        <meta property="og:title" content="Event Decoration Gallery" />
        <meta
          property="og:description"
          content="Explore stunning wedding, birthday and party decoration images."
        />
        <meta property="og:type" content="website" />
      </Helmet> */}


      <div className="min-h-screen bg-white px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <h1 className="text-4xl font-bold text-center mb-8 mt-15">
            Event Gallery
          </h1>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-sm border transition
                  ${
                    activeCategory === cat
                      ? "bg-black text-white"
                      : "bg-white text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <p className="text-center text-gray-500">Loading gallery...</p>
          )}

          {/* Empty */}
          {!loading && filteredImages.length === 0 && (
            <p className="text-center text-gray-500">
              No images found in this category.
            </p>
          )}

          {/* Gallery Grid */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredImages.map((img) => (
              <div
                key={img._id}
                onClick={() => setLightboxImg(img)}
                className="cursor-pointer overflow-hidden rounded-lg shadow hover:shadow-xl transition group"
              >
                <img
                  src={img.url}
                  alt={`${img.title} - ${img.category} decoration`}
                  loading="lazy"
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="p-3 bg-gray-50">
                  <h3 className="font-semibold">{img.title}</h3>
                  <p className="text-sm text-gray-500 capitalize">
                    {img.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔲 Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setLightboxImg(null)}
        >
          <div
            className="max-w-4xl w-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImg.url}
              alt={lightboxImg.title}
              className="w-full max-h-[80vh] object-contain rounded"
            />
            <div className="text-center text-white mt-4">
              <h2 className="text-xl font-semibold">{lightboxImg.title}</h2>
              <p className="capitalize text-gray-300">
                {lightboxImg.category}
              </p>
              <p className="text-sm mt-2 opacity-70">
                Press <b>ESC</b> or click outside to close
              </p>
            </div>
          </div>
        </div>
      )}


      {/* 🦶 Footer */}
      <Footer />
    </>
  );
};

export default Gallery;

