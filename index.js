"use strict";

const server = require("./server.js");
const config = require("./config.js");
require("./redisconn.js");

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception was here.");
    console.error(err.stack);
    if(process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "test"){
        //show on screen.
        //
        process.exit(1);
    }else{
        //TODO: RESTART APP
        //TODO:"" REDIRECT
        // TODO: LOG ERROR
        // TODO: SEND EMAIL
        console.log("production stuff");
    }

});

server.listen(server.get("PORT"), (err) => {
    if(err){
        console.error(err);
    }else{
        console.log("[W] LISTEN on PORT %s.", server.get("PORT"));
    }    
});




