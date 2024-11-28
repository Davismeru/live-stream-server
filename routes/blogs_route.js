const express = require("express");
const { blogsController } = require("../controllers/blogd_controller");
const router = express.Router();

router.post("/create_blog", blogsController);

module.exports = router;
