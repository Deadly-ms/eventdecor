const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    features: [{ type: String }],
    heroImage: String,     // ✅ URL
    gallery: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
