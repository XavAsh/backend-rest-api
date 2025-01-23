const express = require("express");
const router = express.Router();
const { User } = require("../models"); // Import the User model

// POST route for creating a user
router.post("/", async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, status } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create a new user
    const user = await User.create({
      username,
      email,
      password, // In a real app, hash the password first!
      firstName,
      lastName,
      status: status || "active", // Default to "active" if status is not provided
    });

    // Respond with the created user
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to create user", details: error.message });
  }
});

module.exports = router;
