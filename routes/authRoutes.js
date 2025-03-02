const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Secret key for JWT (use environment variable in production)
const JWT_SECRET = "your_secret_key";

// Register user
router.post("/register", async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create new user
        const newUser = new User({ username, email, password, role });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
});

// Login user
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });

    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
});

// Verify token (protected route example)
router.get("/protected", authMiddleware(), (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;