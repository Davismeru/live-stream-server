const express = require("express");
const {
  leaguesController,
  getLeagues,
} = require("../controllers/leagues_controller");
const router = express.Router();

router.post("/add_league", leaguesController);
router.get("/get_leagues", getLeagues);

module.exports = router;
