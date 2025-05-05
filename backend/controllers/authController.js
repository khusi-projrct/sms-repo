const User = require("../models/userModel");
const UserRole = require("../models/userRole.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create New User
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

        //get user roles 
        const userRoleData = await UserRole.findOne({ userId: user._id }).populate("roleIds");
        const roleNames = userRoleData ? userRoleData.roleIds.map(role => role.name) : [];

        //Generate JWT token
        const token = jwt.sign({ id: user._id, email: user.email, roles: roleNames }, process.env.JWT_SECRET, { expiresIn: "7d" });


        res.json({ message: "Login successful", token, user: { id: user._id, name: user.name, roles: roleNames } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, "-password"); //exclude password
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser, getAllUsers };