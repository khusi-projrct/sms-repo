const UserRole = require("../models/userRole");
const RolePermission = require("../models/rolePermission");
const Permission = require("../models/permission");

const checkPermission = (requiredPermissionName) => {
    return async (req, res, next) => {
        try {
            const userId = req.user.userId;

            const userRoles = await UserRole.findOne({ userId });
            if (!userRoles || !userRoles.roleIds.length) {
                return res.status(403).json({ message: "No roles assigned to this user" });
            }

            const rolePermissions = await RolePermission.find({ roleId: { $in: userRoles.roleIds } }).populate("permissionIds");
            const allPermissionNames = rolePermissions.flatMap(rp => rp.permissionIds.map(p => p.name));

            if (!allPermissionNames.includes(requiredPermissionName)) {
                return res.status(403).json({ message: "Permission denied" });
            }

            next();
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    };
};

module.exports = checkPermission;