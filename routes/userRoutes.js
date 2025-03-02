const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/UserModel");

// Get all users (admin only)
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

// Update user (admin or regular user)
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, role } = req.body;

        // Regular users can only update their own profile
        if (req.user.role === "regular" && req.user.userId !== id) {
            return res.status(403).json({ message: "Access denied" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, email, role },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};

// Delete user (admin only)
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};

// Routes
router.get("/all", authMiddleware("admin"), getUsers); // Only admins can view all users
router.put("/update/:id", authMiddleware("admin", "regular"), updateUser); // Admins & Regular users can update
router.delete("/delete/:id", authMiddleware("admin"), deleteUser); // Only admins can delete users

module.exports = router;