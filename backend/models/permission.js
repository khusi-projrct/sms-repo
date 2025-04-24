const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    }
});

// Create a compound unique index
permissionSchema.index({ model: 1, name: 1 }, { unique: true });

const Permission = mongoose.model("Permission", permissionSchema);

module.exports = Permission;