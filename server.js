"use strict";

const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
// const config = require("./config.js");
const main_routes = require("./main_routes.js");
const api_routes = require("./api_routes.js");

let app = express();
app.set("PORT", process.env.PORT || 1990);
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/", main_routes);
app.use("/api", api_routes);

app.get("/*", (req, res) => {
    res.redirect("/");
});

module.exports = app;

