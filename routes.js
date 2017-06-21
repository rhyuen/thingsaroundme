"use strict";

const express = require("express");
const eventbrite = require("./eventbrite.js");
const meetup = require("./meetup.js");
const router = express.Router();

router.get("/", (req, res) => {
    eventbrite((err, val) => {
        if(err){
            console.log(err);
        }else{
            res.status(200).send(val);
        }        
    });    
});

router.get("/meetup", (req, res) => {
    meetup((err, meetupData) => {
        if(err){
            console.log(err);
        }else{
            res.status(200).json(meetupData);
        }
    });
});

module.exports = router;