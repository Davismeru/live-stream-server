// models/Email.js

const mongoose = require("mongoose");

const leaguesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  matchday: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("leagues", leaguesSchema);
