const blogsModel = require("../models/blogs_model");

const blogsController = async (req, res) => {
  const { headline, img, content, category } = req.body;
  await blogsModel.create({
    headline,
    img,
    content,
    category,
  });

  res.send("blog added");
};

const displayBlogs = async (req, res) => {
  res.send("blogs displayed");
};

module.exports = {
  blogsController,
  displayBlogs,
};
