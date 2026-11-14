// protect: only lets requests through if they carry a valid JWT
// Expected header:  Authorization: Bearer <token>
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ success: false, message: "User no longer exists" });
    req.user = { id: user._id, name: user.name, email: user.email };
    next();
  } catch (err) {
    next(err); // JsonWebTokenError / TokenExpiredError handled in errorHandler
  }
};

module.exports = { protect };
