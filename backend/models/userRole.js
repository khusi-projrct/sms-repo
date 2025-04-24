const mongoose = require("mongoose");

const userRoleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    roleIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true
    }]
});

module.exports = mongoose.model("UserRole", userRoleSchema);