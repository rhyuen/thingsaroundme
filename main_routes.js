"use strict";

const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "views/index.html"));
});

router.get("/list", (req, res) => {
    res.status(200).sendfile(path.join(__dirname, "views/list.html"));
});



module.exports = router;