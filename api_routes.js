"use strict";

const express = require("express");
const eventbrite = require("./eventbrite.js");
const meetup = require("./meetup.js");
const movies = require("./movies.js");
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

router.get("/movies", (req, res) => {
    movies((err, movieData) => {
        if(err){
            console.log(err);
        }else{
            res.status(200).json({length: movieData.length, movieData});
        }
    });
});

module.exports = router;