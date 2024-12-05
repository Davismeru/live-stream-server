const blogs_model = require("../models/blogs_model");

const blogsController = async (req, res) => {
  const { headline, img, content } = req.body;
  await blogs_model.create({
    headline,
    img,
    content,
  });

  res.send("blog added");
};

const displayBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 2 } = req.query;
    const blogs = await blogs_model
      .find()
      .sort({ createdAt: -1 }) // Sort by latest
      .skip((page - 1) * limit) // Skip previous pages
      .limit(Number(limit)); // Limit results

    const totalBlogs = await blogs_model.countDocuments();
    const totalPages = Math.ceil(totalBlogs / limit);

    res.json({
      totalPages,
      blogs,
    });
  } catch {
    res.json({ error: "error displaying blogs content" });
  }
};

const displaySelectedBlog = async (req, res) => {
  const { id } = req.body;
  const blog = await blogs_model.findOne({ _id: id }, { _id: 0 });
  res.json(blog);
};

module.exports = {
  blogsController,
  displayBlogs,
  displaySelectedBlog,
};
