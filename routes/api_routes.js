"use strict";

const express = require("express");
const eventbrite = require("../dataretrieval/eventbrite.js");
const meetup = require("../dataretrieval/meetup.js");
const movies = require("../dataretrieval/movies.js");
const router = express.Router();

router.get("/eventbrite", (req, res) => {
    eventbrite((err, eventbriteData) => {
        if(err){
            console.log(err);
        }else{
            res.status(200).json({
                    length: eventbriteData.length, 
                    eventbriteData
                });
        }        
    });    
});

router.get("/meetup", (req, res) => {
    meetup((err, meetupData) => {
        if(err){
            console.log(err);
        }else{
            res.status(200).json({
                length: meetupData.length, 
                meetupData
            });
        }
    });
});

router.get("/movies", (req, res) => {
    movies((err, movieData) => {
        if(err){
            console.log(err);
        }else{
            res.status(200).json({
                length: movieData.length, 
                movieData
            });
        }
    });
});

module.exports = router;