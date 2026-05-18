// const { clerkMiddleware, clerkClient, getAuth } = require("@clerk/express");
const { clerkClient, getAuth } = require("@clerk/express");

async function isAdmin(req, res, next) {
  try {
    const auth = getAuth(req);
    if (!auth.userId) return res.status(401).json({ error: "Not logged in" });

    const user = await clerkClient.users.getUser(auth.userId);
    const isAdmin = user?.publicMetadata?.role === "admin";

    if (!isAdmin) return res.status(403).json({ error: "Admin only" });

    next();
  } catch (err) {
    console.error("❌ Admin check error:", err.message);
    res.status(500).json({ error: "Auth error" });
  }
}

module.exports = {
  // clerkMiddleware,
  isAdmin,
};
