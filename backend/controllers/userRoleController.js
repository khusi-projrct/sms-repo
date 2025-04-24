const UserRole = require("../models/userRole");
const Role = require("../models/role");

const assignRoleToUser = async (req, res) => {
    try {
        const { userId, roleIds } = req.body;

        const existing = await UserRole.findOne({ userId });

        if (existing) {
            existing.roleIds = roleIds;
            await existing.save();
            return res.json({ message: "Role updated for user", data: existing });
        }

        const userRole = new UserRole({ userId, roleIds });
        await userRole.save();
        res.status(201).json({ message: "Role assign to user", data: userRole });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRoleByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const userRole = await UserRole.findOne({ userId }).populate("roleIds");

        if (!userRole) {
            return res.status(404).json({ message: "Role not found for this user" });
        }

        res.json({ roles: userRole.roleIds });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { assignRoleToUser, getRoleByUser };