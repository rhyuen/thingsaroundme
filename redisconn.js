"use strict";

const config = require("./config.js");
const redis = require("redis");
const PORT = config[process.env.NODE_ENV].redis.port;
const HOST = config[process.env.NODE_ENV].redis.host;
const PASSWORD = config[process.env.NODE_ENV].redis.password;

const client = redis.createClient(PORT, HOST, {no_ready_check: true});
client.auth(PASSWORD, (err) => {
    if(err){
        //Do a Reconnection on ERR
        //err.ECONNRESET
        throw err;

    }else{
        console.log("Authenticated");
    }
});

client.on("connect", () => {
    console.log("Connected to Redis");    
});
client.on("error", (err) => {
    console.log("Redis Error: %s", err);
});

exports.getCachedVenue = (venueId, done) => {
    client.hgetall(venueId, (err, cached) => {
        if(err){
            console.log(err);
            done(err);
        }else{
            done(null, cached);
        }
    });
};

exports.cacheVenue = (venueId, venueData, done) => {
    client.hmset(venueId, venueData, (err, save_status) => {
        if(err){
            console.log(err);
            save_status(err);
        }else{
            done(null, save_status);
        }
    });
};