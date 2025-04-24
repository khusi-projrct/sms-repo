const mongoose = require("mongoose");

const rolePermissionSchema = new mongoose.Schema({
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true
    },
    permissionIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Permission"
        }
    ]
});

module.exports = mongoose.model("rolePermission", rolePermissionSchema);