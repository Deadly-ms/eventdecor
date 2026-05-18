const express = require("express");
const { clerkMiddleware, isAdmin } = require("../middleware/auth");
const Message = require("../models/Message");
const sendMail = require("../utils/sendMail");

const router = express.Router();

// GET /api/admin/messages
router.get(
  "/messages",
  // clerkMiddleware({ jwtTemplate: "admin" }),
  isAdmin,
  async (req, res) => {
    try {
      const messages = await Message.find().sort({ createdAt: -1 });
      res.json(messages);
    } catch (err) {
      console.error("❌ DB ERROR:", err);
      res.status(500).json({ error: "Failed to load messages" });
    }
  }
);


// GET /api/admin/messages/count
router.get(
  "/messages/count",
  // clerkMiddleware({ jwtTemplate: "admin" }),
  isAdmin,
  async (req, res) => {
    try {
      const count = await Message.countDocuments();
      res.json({ count });
    } catch (err) {
      res.status(500).json({ error: "Failed to get message count" });
    }
  }
);


// DELETE /api/admin/messages/:id
router.delete(
  "/messages/:id",
  // clerkMiddleware({ jwtTemplate: "admin" }),
  isAdmin,
  async (req, res) => {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  }
);

// POST /api/admin/messages/:id/reply
router.post(
  "/messages/:id/reply",
  // clerkMiddleware({ jwtTemplate: "admin" }),
  isAdmin,
  async (req, res) => {
    const { subject, reply } = req.body;

    if (!subject || !reply) {
      return res.status(400).json({ error: "Subject & message required" });
    }

    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).json({ error: "Message not found" });

    try {
      await sendMail({
        to: msg.email,
        subject,
        html: `
          <p>Hi ${msg.name},</p>
          <p>${reply}</p>
          <br/>
          <p>Regards,<br/>Admin Team</p>
        `,
      });

      msg.replied = true;
      await msg.save();

      res.json({ success: true });
    } catch (err) {
      console.error("❌ Email send error:", err);
      res.status(500).json({ error: "Failed to send reply email" });
    }
  }
);

module.exports = router;
