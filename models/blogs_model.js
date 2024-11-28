// models/Email.js

const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema({
  headline: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("blogs", blogsSchema);
