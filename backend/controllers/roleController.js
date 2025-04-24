const Role = require("../models/role");
// const Permission = require("../models/permission");

const createRole = async (req, res) => {
    try {
        const { name } = req.body;

        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            return res.status(400).json({ message: "Role already exists" });
        }

        const role = new Role({ name });
        await role.save();

        res.status(201).json({ message: "Role created Successfully", role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

// const assignPermissionToRole = async (req, res) => {
//     try {
//         const { roleId, permissionIds } = req.body;

//         const role = await Role.findById(roleId);
//         if (!role)
//             return res.status(404).json({ message: "Role not found" });

//         const permission = await Permission.find({ _id: { $in: permissionIds } });
//         if (permission.length !== permissionIds.length) {
//             return res.status(400).json({ message: "One or more permissions are invalid" });
//         }

//         role.permissions = permissionIds;
//         await role.save();

//         const updateRole = await Role.findById(roleId).populate("permissions"); //will fetch the full permissions 

//         res.json({ message: "Permissions assigned to role", role: updateRole });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

module.exports = { createRole, getRoles };