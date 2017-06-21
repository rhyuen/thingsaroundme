"use strict";

const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const config = require("./config.js");
const main_routes = require("./main_routes.js");
const routes = require("./routes.js");

let app = express();
app.set("PORT", process.env.PORT || 1990);
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/", main_routes);
app.use("/api", routes);


module.exports = app;

