// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user.status !== "admin") {
    return res
      .status(403)
      .json({ message: "Access denied. Admin rights required." });
  }
  next();
};

module.exports = isAdmin;
