const Image = require("../models/Image");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// helper
const uploadFromBuffer = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "event_gallery" },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });

// ✅ UPLOAD
exports.uploadImage = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!req.file) return res.status(400).json({ error: "No file" });
    if (!title || !category)
      return res.status(400).json({ error: "Title & category required" });

    const result = await uploadFromBuffer(req.file.buffer);

    const image = await Image.create({
      title,
      category,
      url: result.secure_url,
      publicId: result.public_id,
    });

    res.status(201).json(image);
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
};

// ✅ FETCH
exports.getImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
};

// ✅ DELETE
exports.deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ error: "Not found" });

    await cloudinary.uploader.destroy(image.publicId);
    await image.deleteOne();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};

// ✅ UPDATE (replace image optional)
exports.updateImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ error: "Not found" });

    const { title, category } = req.body;

    if (req.file) {
      await cloudinary.uploader.destroy(image.publicId);
      const result = await uploadFromBuffer(req.file.buffer);
      image.url = result.secure_url;
      image.publicId = result.public_id;
    }

    if (title) image.title = title;
    if (category) image.category = category;

    await image.save();
    res.json(image);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
};
