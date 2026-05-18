const Service = require("../models/Service");
const cloudinary = require("../config/cloudinary");
const Gallery = require("../models/Image");

exports.createService = async (req, res) => {
  try {
    const { title, slug, description, features } = req.body;

    let heroImageUrl = "";
    let galleryImages = [];

    // ---------- HERO IMAGE ----------
    if (req.files?.heroImage?.length) {
      const hero = req.files.heroImage[0];
      const heroUpload = await cloudinary.uploader.upload(
        `data:image/png;base64,${hero.buffer.toString("base64")}`
      );
      heroImageUrl = heroUpload.secure_url;
    }

    // ---------- GALLERY ----------
    if (req.files?.gallery?.length) {
      galleryImages = await Promise.all(
        req.files.gallery.map(async (file) => {
          const upload = await cloudinary.uploader.upload(
            `data:image/png;base64,${file.buffer.toString("base64")}`
          );

          return {
            title,
            category: slug,
            url: upload.secure_url,
            publicId: upload.public_id,
          };
        })
      );
    }

    // ---------- CREATE SERVICE ----------
    const service = await Service.create({
      title,
      slug,
      description,
      features: JSON.parse(features || "[]"),
      heroImage: heroImageUrl,
      gallery: galleryImages.map(img => img.url),
    });

    // ---------- AUTO ADD TO GALLERY ----------
    if (galleryImages.length > 0) {
      await Gallery.insertMany(galleryImages);
    }

    res.status(201).json(service);
  } catch (err) {
    console.error("CREATE SERVICE ERROR:", err);
    res.status(400).json({ message: err.message });
  }
};

// ---------------- GET ALL ----------------
exports.getServices = async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  res.json(services);
};

// ---------------- GET BY SLUG ----------------
exports.getServiceBySlug = async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug });

  if (!service)
    return res.status(404).json({ message: "Service not found" });

  res.json(service);
};

exports.updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const { title, slug, description, features } = req.body;

    // -------- TEXT --------
    service.title = title;
    service.slug = slug;
    service.description = description;
    service.features = JSON.parse(features || "[]");

    // -------- HERO IMAGE --------
    if (req.files?.heroImage) {
      const hero = req.files.heroImage[0];
      const heroUpload = await cloudinary.uploader.upload(
        `data:image/png;base64,${hero.buffer.toString("base64")}`
      );
      service.heroImage = heroUpload.secure_url;
    }

    // ---------- GALLERY ----------
    let galleryUrls = [];

    if (req.files?.gallery) {
      galleryUrls = await Promise.all(
        req.files.gallery.map(async (file) => {
          const upload = await cloudinary.uploader.upload(
            `data:image/png;base64,${file.buffer.toString("base64")}`
          );

          return {
            url: upload.secure_url,
            category: slug, // 🔥 AUTO CATEGORY FROM SERVICE
            title: title,
          };
        })
      );
    }
    // ***********************************************************
    if (galleryUrls.length > 0) {
      service.gallery = galleryUrls.map(img => img.url);

      await Gallery.insertMany(
        galleryUrls.map(img => ({
          title,
          category: slug,
          url: img.url,
        }))
      );
    }

      await service.save();
      res.json(service);
      } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
      }
    };

// ---------------- DELETE ----------------
exports.deleteService = async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Service deleted" });
};
