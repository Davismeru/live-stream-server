const leagues_model = require("../models/leagues_model");

// add new league
const leaguesController = async (req, res) => {
  const { name, logo, matchday, order } = req.body;
  const check_league = await leagues_model.findOne({ name: name });
  if (!check_league) {
    leagues_model
      .create({
        name,
        logo,
        matchday,
        order,
      })
      .then(() => res.send("league added succesfully"))
      .catch((err) => {
        res.json({ error: "error creating league" });
      });
  } else {
    leagues_model
      .updateOne(
        {
          name: name,
        },
        {
          name,
          logo,
          matchday,
          order,
        }
      )
      .then(() => {
        res.send("league updated succesfully");
      })
      .catch(() => {
        res.json({ error: "error updating league" });
      });
  }
};

// get all leagues
const getLeagues = async (req, res) => {
  const all_leagues = await leagues_model.find({}, { _id: 0 });
  res.json(all_leagues);
};
module.exports = {
  leaguesController,
  getLeagues,
};
