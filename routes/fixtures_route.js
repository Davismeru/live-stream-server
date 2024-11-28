const express = require("express");
const {
  fixturesController,
  fetchFixturesController,
  deleteFixturesController,
} = require("../controllers/fixtures_controller");
const router = express.Router();

router.patch("/update_fixtures", fixturesController);
router.get("/get_fixtures", fetchFixturesController);
router.patch("/delete_fixture", deleteFixturesController);

module.exports = router;
