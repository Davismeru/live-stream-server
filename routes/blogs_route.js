const express = require("express");
const {
  blogsController,
  displayBlogs,
  displaySelectedBlog,
} = require("../controllers/blogs_controller");
const router = express.Router();

router.post("/create_blog", blogsController);
router.get("/display_blogs", displayBlogs);
router.post("/selected_blog", displaySelectedBlog);

module.exports = router;
