const express = require("express");
const router = express.Router();
const { assignRoleToUser, getRoleByUser } = require("../controllers/userRoleController");

router.post("/", assignRoleToUser);
router.get("/:userId", getRoleByUser);

module.exports = router;