const express = require("express");
const router = express.Router();

const {
  createService,
  getServices,
  getServiceBySlug,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const { clerkMiddleware, isAdmin } = require("../middleware/auth");

const upload = require("../middleware/upload");

// Public
router.get("/", getServices);
router.get("/:slug", getServiceBySlug);

// Admin

// router.post("/", clerkMiddleware(), isAdmin, createService);

router.post("/",
  //  clerkMiddleware(),
    isAdmin,
    upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 }
  ]),
     createService);

// router.put("/:id", clerkMiddleware(), isAdmin, updateService);

router.put(
  "/:id",
  // clerkMiddleware(),
  isAdmin,
  upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 }
  ]),
  updateService
);

router.delete("/:id",
  //  clerkMiddleware(),
    isAdmin,
     deleteService);

module.exports = router;
