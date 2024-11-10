const fixtures_model = require("../models/fixtures_model");

const fixturesController = async (req, res) => {
  const { league, match } = req.body;
  const { index, fixture, time, channel, status } = match;

  // Check if the match with the given index exists in the matches array
  const existingFixture = await fixtures_model.findOne({
    league: league,
    "matches.index": index,
  });

  if (existingFixture) {
    // If it exists, update the specific fields of that match
    await fixtures_model.updateOne(
      {
        league: league,
        "matches.index": index,
      },
      {
        $set: {
          "matches.$.fixture": fixture,
          "matches.$.time": time,
          "matches.$.channel": channel,
          "matches.$.status": status,
        },
      }
    );
  } else {
    // If it doesn't exist, add a new object to the matches array
    await fixtures_model.updateOne(
      { league: league },
      {
        $addToSet: {
          matches: { index: index, fixture, time, channel, status },
        },
      },
      { upsert: true }
    );
  }

  res.send("Game updated successfully");
};

const fetchFixturesCOntroller = async (req, res) => {
  const fixturesData = await fixtures_model.find({}, { _id: 0 });
  res.send(fixturesData);
};

module.exports = {
  fixturesController,
  fetchFixturesCOntroller,
};
