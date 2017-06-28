"use strict";

const express = require("express");
const eventbrite = require("./eventbrite.js");
const meetup = require("./meetup.js");
const router = express.Router();

router.get("/eventbrite", (req, res) => {
    eventbrite((err, val) => {
        if(err){
            console.log(err);
        }else{
            res.status(200).json({length: val.length, val});
        }        
    });    
});

router.get("/meetup", (req, res) => {
    meetup((err, meetupData) => {
        if(err){
            console.log(err);
        }else{
            res.status(200).json({length: meetupData.length, meetupData});
        }
    });
});

module.exports = router;