const express = require("express");
const {
  addAdminController,
  adminSigninController,
  verifyToken,
} = require("../controllers/admin_controller");
const router = express.Router();

router.post("/register_admin", addAdminController);
router.post("/admin_signin", adminSigninController);
router.post("/verify_token", verifyToken);

module.exports = router;
