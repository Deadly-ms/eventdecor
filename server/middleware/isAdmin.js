const isAdmin = (req, res, next) => {
  if (!req.auth) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.auth.publicMetadata?.role !== "admin") {
    return res.status(403).json({ error: "Admins only" });

  }

  next();
};

module.exports = { isAdmin };