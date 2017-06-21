"use strict";

const server = require("./server.js");

server.listen(server.get("PORT"), (err) => {
    if(err){
        console.error(err);
    }else{
        console.log("[W] LISTEN on PORT %s.", server.get("PORT"));
    }    
});