const express = require("express");
const { body, validationResult } = require("express-validator");
const Message = require("../models/Message");

const router = express.Router();

/**
 * POST /api/contact
 */
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("message").notEmpty().withMessage("Message is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const msg = new Message(req.body);
      await msg.save();
      res.status(201).json({ success: true, message: "Message sent" });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
