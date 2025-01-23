// Middleware to check if the user is a client
exports.isClient = (req, res, next) => {
  if (req.user.status !== "client") {
    return res
      .status(403)
      .json({ message: "Access denied. Client rights required." });
  }
  next();
};
