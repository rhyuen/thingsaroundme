"use strict";

const request = require("request");
const config = require("./config.js");
const targetURL = "http://api.meetup.com/find/events";
const apiKey = config[process.env.NODE_ENV].meetup;

const options = {
    url: `${targetURL}?key=${apiKey}`,
    headers: {
        "Content-Type": "application/json",
        "Accept-Charset": "utf-8",        
    }
};

module.exports = (next) => {
    let meetupList = [];
    request.get(options, (err, res, body) => {
        if(err){
            console.error(err);
            next(err, null);
        }else{
            let meetupData = JSON.parse(body);
            meetupData.forEach((meetup) => {                
                console.log(meetupData);
                const curr_meetup_data = {
                    name: meetup.name,
                    date: new Date(meetup.time).toISOString(),
                    curr_rsvp_count: meetup.yes_rsvp_count,
                    group_name: meetup.group.name,
                    url: meetup.link                    
                };
                meetupList.push(curr_meetup_data);
            });
            next(null, meetupList);
        }
    });
};

