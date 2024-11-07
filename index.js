const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

// connect to mongodb
const mongoURI = process.env.MONGO_URI;

// emails middleware
const emailsRouter = require("./routes/emails_route");
app.use("/", emailsRouter);

mongoose
  .connect(mongoURI)
  .then(() => {
    app.listen(3000, () => {
      console.log("server running");
    });
  })
  .catch((error) => console.error("MongoDB connection error:", error));
