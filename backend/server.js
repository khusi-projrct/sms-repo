// configure main server
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();     //Connect to MongoDB

const app = express();
app.use(express.json());  //Enable JSON body parsing
app.use(cors());  //Allow frontend requsts

const authRoutes = require("./routes/authRoutes"); //import routes (user)
app.use("/api/auth", authRoutes);

const roleRoutes = require("./routes/roleRoutes"); //import roleRoutes
app.use("/api/roles", roleRoutes);

const permissionRoutes = require("./routes/permissionRoutes"); //import permissionRoutes
app.use("/api/permissions", permissionRoutes);

const rolePermissionRoutes = require("./routes/rolePermissionRoutes"); //import rolePermissionRoutes
app.use("/api/role-permissions", rolePermissionRoutes);

const userRoleRoutes = require("./routes/userRoleRoutes"); //import userRoleRoutes
app.use("/api/user-roles", userRoleRoutes);

//Default Routes
app.get("/", (req, res) => {
    res.send("School Management System API is runnig...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`));