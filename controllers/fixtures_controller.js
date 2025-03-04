const fixtures_model = require("../models/fixtures_model");

const fixturesController = async (req, res) => {
  const {
    league,
    index,
    fixture,
    time,
    channel,
    status,
    channel_2,
    sub_channel,
  } = req.body;
  console.log(league, index, fixture, time, channel, status);

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
          "matches.$.channel_2": channel_2,
          "matches.$.sub_channel": sub_channel,
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

const fetchFixturesController = async (req, res) => {
  const fixturesData = await fixtures_model.find({}, { _id: 0 });
  res.json(fixturesData);
};

const deleteFixturesController = async (req, res) => {
  const { index, league } = req.body;

  // Remove the match with the specified index from the 'matches' array
  await fixtures_model.updateOne(
    { league: league }, // Find the fixture by league
    { $pull: { matches: { index: index } } } // Pull the match object where the index matches
  );

  res.send("Match deleted successfully");
};

module.exports = {
  fixturesController,
  fetchFixturesController,
  deleteFixturesController,
};
