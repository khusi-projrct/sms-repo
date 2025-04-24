const express = require('express');
const { registerUser, loginUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

//only logged-in users can access this
router.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "Profile data", user: req.user });
});

module.exports = router;