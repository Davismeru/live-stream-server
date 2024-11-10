const express = require("express");
const {
  fixturesController,
  fetchFixturesCOntroller,
} = require("../controllers/fixtures_controller");
const router = express.Router();

router.patch("/update_fixtures", fixturesController);
router.get("/get_fixtures", fetchFixturesCOntroller);

module.exports = router;
