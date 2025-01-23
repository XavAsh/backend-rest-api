const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Routes for authentication
router.post("/register", authController.register); // Register a new user
router.post("/login", authController.login); // Login a user

module.exports = router;
