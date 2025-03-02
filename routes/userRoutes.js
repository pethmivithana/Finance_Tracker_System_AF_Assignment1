const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// Controllers (assumed)
const { getUsers, updateUser, deleteUser } = require("../controllers/userController");

// Routes
router.get("/all", authMiddleware("admin"), getUsers); // Only admins can view all users
router.put("/update/:id", authMiddleware("admin", "regular"), updateUser); // Admins & Regular users can update
router.delete("/delete/:id", authMiddleware("admin"), deleteUser); // Only admins can delete users

module.exports = router;
