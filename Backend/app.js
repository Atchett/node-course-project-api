const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

// route imports
const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");

// middleware imports
const errors = require("./middleware/errors");
const headers = require("./middleware/corsHeaders");
const multer = require("./middleware/useMulter");

const app = express();

// middleware
app.use(bodyParser.json()); // application/json
app.use(multer.useMulter);

// set global response headers
app.use(headers.setCors);

// route handling
app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

// generic error handling
app.use(errors.handleError);

// db config
const MONGODB_OLD_URIFORMAT = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-shard-00-00.hrm10.mongodb.net:27017,cluster0-shard-00-01.hrm10.mongodb.net:27017,cluster0-shard-00-02.hrm10.mongodb.net:27017/${process.env.MONGO_DB}?ssl=true&replicaSet=atlas-9469ec-shard-0&authSource=admin&retryWrites=true&w=majority`;

const MONGODB_CONNECTION_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
// connect to db
mongoose
  .connect(MONGODB_OLD_URIFORMAT, MONGODB_CONNECTION_OPTIONS)
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
