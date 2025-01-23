const User = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sequelize = require("../config/database");
const { Sequelize, Op } = require("sequelize");

// User registration
exports.register = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      status: "client", // Default status
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: newUser.id,
    });
  } catch (error) {
    console.error("Error during registration:", error.message, error.stack); // Log the error
    res.status(500).json({
      message: "Server error during registration",
      error: error.message,
    }); // Send detailed error message
  }
};

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// User login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user in the database by username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      // If no user is found, return an "Invalid credentials" message
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the provided password matches the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // If the passwords don't match, return an "Invalid credentials" message
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token with user information
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        status: user.status,
      },
      JWT_SECRET,
      { expiresIn: "30d" } // Token expiry time
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ message: "Server error during login", error: error.message });
  }
};
