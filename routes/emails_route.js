const express = require("express");
const { emailsController } = require("../controllers/emails_controller");
const router = express.Router();

router.post("/email", emailsController);

module.exports = router;
