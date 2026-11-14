const notFound = (req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
};

const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({ success: false, message: Object.values(err.errors).map((e) => e.message).join(", ") });
  }
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ success: false, message: "Token expired, please log in again" });
  }
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ success: false, message: "Not authorized, invalid token" });
  }
  if (err.code === 11000) {
    return res.status(409).json({ success: false, message: "Duplicate value, already exists" });
  }
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ success: false, message: "Invalid JSON in request body" });
  }
  console.error(err);
  res.status(500).json({ success: false, message: "Server error" });
};

module.exports = { notFound, errorHandler };
