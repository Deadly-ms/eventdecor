const express = require("express");
const router = express.Router();
const multer = require("multer");

// Set memory storage and 10MB limit
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// const { clerkMiddleware, isAdmin } = require("../middleware/auth");
const { isAdmin } = require("../middleware/auth");
const {
  getImages,
  uploadImage,
  deleteImage,
  updateImage,
} = require("../controllers/imageController");

router.get("/", getImages);

router.post(
  "/",
  // clerkMiddleware({ jwtTemplate: "admin" }),
  isAdmin,
  upload.single("image"),
  uploadImage
);

router.put(
  "/:id",
  // clerkMiddleware({ jwtTemplate: "admin" }),
  isAdmin,
  upload.single("image"),
  updateImage
);

router.delete(
  "/:id",
  // clerkMiddleware({ jwtTemplate: "admin" }),
  isAdmin,
  deleteImage
);




module.exports = router;

