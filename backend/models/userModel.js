const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: {
        type: [String],
        enum: ["admin", "teacher", "student"],
        default: ["student"]
    }
});

module.exports = mongoose.model("user", userSchema);
