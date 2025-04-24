const express = require("express");
const router = express.Router();
const { createRole, getRoles } = require("../controllers/roleController");
// const { assignPermissionToRole } = require("../controllers/roleController");

router.post("/create", createRole);
router.get("/", getRoles);

// router.post("/assign-permissions", assignPermissionToRole);
module.exports = router;