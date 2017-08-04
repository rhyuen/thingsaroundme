"use strict";

const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "public/views/index.html"));
});

router.get("/react", (req, res) => {
    res.status(200).sendfile(path.join(__dirname, "dist/index.html"));
});

router.get("/list", (req, res) => {
    res.status(200).sendfile(path.join(__dirname, "public/views/list.html"));
});



module.exports = router;