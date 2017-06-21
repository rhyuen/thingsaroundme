"use strict";

const nconf = require("nconf");

nconf.file("keys.json");

module.exports = {
    prod:{
        redis: nconf.get("prod:redis") || process.env.redis,
        meetup: nconf.get("prod:meetup") || process.env.meetup,
        eventbrite: nconf.get("prod:eventbrite") || process.env.eventbrite,
        db: nconf.get("prod:db") || process.env.db
    },
    dev: {
        redis: nconf.get("dev:redis") || process.env.redis,
        meetup: nconf.get("dev:meetup") || process.env.meetup,
        eventbrite: nconf.get("dev:eventbrite") || process.env.eventbrite,
        db: nconf.get("dev:db") || process.env.db
    }    
};

