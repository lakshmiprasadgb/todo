const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var cors = require("cors");
require("dotenv").config();
const path = require("path");
const routes = require(path.join(__dirname, "/routes"));

app.use(cors());

app.use(bodyParser.json());

app.use("/", routes);

app.listen(process.env.PORT, () => {
  console.log(`I am running on port ${process.env.PORT}`);
});
