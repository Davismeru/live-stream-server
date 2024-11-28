const admin_model = require("../models/admin_model");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const jwt = require("jsonwebtoken");

const addAdminController = async (req, res) => {
  const { username, password } = req.body;
  const admin = await admin_model.findOne();
  if (admin) {
    res.json({ error: "An admin alredy exists" });
  } else {
    bcrypt.hash(password, saltRounds).then(function (hash) {
      admin_model
        .create({
          username,
          password: hash,
        })
        .then(() => {
          res.send("admin created succesfully");
        })
        .catch(() => {
          res.json({ error: "error registering admin" });
        });
    });
  }
};

const adminSigninController = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.json({ error: "all fields must be filled" });
  } else {
    const admin = await admin_model.findOne({ username: username });
    if (!admin) {
      res.json({ error: "admin not found" });
    } else {
      bcrypt.compare(password, admin.password).then(function (result) {
        if (!result) {
          res.json({ error: "incorrect password" });
        } else {
          const token = jwt.sign({ username: admin.username }, "admin");
          res.send(token);
        }
      });
    }
  }
};

const verifyToken = (req, res) => {
  const { token } = req.body;
  jwt.verify(token, "admin", function (err, decoded) {
    if (err) {
      res.json({ error: "invalid token" });
    } else {
      res.json("admin succesfully signed in");
    }
  });
};

module.exports = {
  addAdminController,
  adminSigninController,
  verifyToken,
};
