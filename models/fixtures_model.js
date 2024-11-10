// models/Email.js

const mongoose = require("mongoose");

const fixturesSchema = new mongoose.Schema({
  league: {
    type: String,
    required: true,
  },
  matches: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("fixtures", fixturesSchema);
