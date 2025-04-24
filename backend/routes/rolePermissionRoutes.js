const express = require("express");
const router = express.Router();
const { assignPermissionsToRole, getPermissionByRole } = require("../controllers/rolePermissionController");

router.post("/", assignPermissionsToRole);
router.get("/:roleId", getPermissionByRole);

module.exports = router;