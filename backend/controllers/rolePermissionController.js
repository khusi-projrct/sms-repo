const RolePermission = require("../models/rolePermission");

const assignPermissionsToRole = async (req, res) => {
    try {
        const { roleId, permissionIds } = req.body;

        const existing = await RolePermission.findOne({ roleId });
        if (existing) {
            existing.permissionIds = permissionIds;
            await existing.save();
            return res.json({ message: "Permission updated for role", data: existing });
        }

        const rolePermission = new RolePermission({ roleId, permissionIds });
        await rolePermission.save();

        res.status(201).json({ message: "Permissions assigned to role", data: rolePermission });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPermissionByRole = async (req, res) => {
    try {
        const { roleId } = req.params;
        const rolePermission = await RolePermission.findOne({ roleId }).populate("permissionIds");

        if (!rolePermission) {
            return res.status(404).json({ message: "No permissions found for this role" });
        }

        res.json({ permissions: rolePermission.permissionIds });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { assignPermissionsToRole, getPermissionByRole };