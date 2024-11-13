const admin_model = require("../models/admin_model");
const adminController = async (req, res) => {
  const { username, password } = req.body;
  const admin = await admin_model.findOne({ username: username });
  if (!admin) {
    res.json({ error: "incorrect username" });
  } else {
  }
};
