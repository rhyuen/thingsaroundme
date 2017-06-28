"use strict";

const nconf = require("nconf");

nconf.file("keys.json");

module.exports = {
    prod:{
        redis: {
            host: nconf.get("prod:redis:host") || process.env.redis_host,
            port: nconf.get("prod:redis:port") || process.env.redis_port,
            password: nconf.get("prod:redis:password") || process.env.redis_password,
        },
        meetup: nconf.get("prod:meetup") || process.env.meetup,
        eventbrite: nconf.get("prod:eventbrite") || process.env.eventbrite,
        db: nconf.get("prod:db") || process.env.db
    },
    dev: {
        redis: {
            host: nconf.get("dev:redis:host") || process.env.redis_host,
            port: nconf.get("dev:redis:port") || process.env.redis_port,
            password: nconf.get("dev:redis:password") || process.env.redis_password,
        },
        meetup: nconf.get("dev:meetup") || process.env.meetup,
        eventbrite: nconf.get("dev:eventbrite") || process.env.eventbrite,
        db: nconf.get("dev:db") || process.env.db
    }    
};

