const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const middleware = require("src/middleware");
const profiles = require("./profiles");
const image = require("./image");
const memberships = require("./memberships");
const pledges = require("./pledges");

const buildFunction = router => {
  const app = express();

  app.use(cors({ origin: true }));
  app.use(bodyParser.json());
  app.use("/", router);
  app.use(middleware.errorHandler);

  return functions.https.onRequest(app);
};

module.exports = {
  profiles: buildFunction(profiles),
  image: buildFunction(image),
  memberships: buildFunction(memberships),
  pledges: buildFunction(pledges)
};
