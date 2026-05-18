const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      lowercase: true,
      index: true,
      required: true,
    },
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", ImageSchema);
