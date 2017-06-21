"use strict";

const request = require("request");
const async = require("async");
const config = require("./config.js");
const token = `?token=${config[process.env.NODE_ENV].eventbrite}`;

const targetURL = `https://www.eventbriteapi.com/v3/events/search/?location.address=Vancouver&location.within=5km&start_date.keyword=this_week&token=${config[process.env.NODE_ENV].eventbrite}`;
const venueURL = "https://www.eventbriteapi.com/v3/venues/";


const options = {
    url: targetURL,
    method: "GET",    
    headers: {
        "Content-Type": "application/json",
        "Accept-Charset": "utf-8",
        "Authorization": `Bearer ${config[process.env.NODE_ENV].eventbrite}`
    },      
};

module.exports = (next) =>{
    
    let pageNumber = 1;
    let pageCount = 4;
    let container = [];
    let gpsList = [];

    async.whilst(
        () => {
            return (pageNumber < pageCount);
        },

        (next) => {        
            request.get(targetURL+"&page="+ pageNumber, (err, res, body) => {
                
                pageNumber++;
                let data = JSON.parse(body);
                                    
                data.events.forEach((item) => {
                    request(venueURL + item.venue_id + token, (err, res, ven_body) => {
                        if(err){
                            console.log(err);
                        }else{
                            let curr_container = [];
                            
                            let venue_data = JSON.parse(ven_body);
                            curr_container.push({
                                name: item.name.text,
                                startTime: item.start.local,
                                url: item.url,
                                venueId: item.venue_id,
                                currency: item.currency,
                                free: item.is_free,
                                language: item.locale,
                                venue_name: venue_data.name,
                                lat: venue_data.address.latitude,
                                lon: venue_data.address.longitude
                            });
                            container.push(...curr_container);                       
                        }                        
                    });                
                    console.log(data.events.length);                
                }); 
                
                next(null, container);
            });        
        },

        (err, list) => {
            if(err){
                console.log(err);            
            }else{                
                // list.forEach((item) => {                    
                //     console.log(item.name);
                //     console.log(item.venue_name);
                //     console.log(item.venueId);
                //     console.log(item.lat);
                //     console.log(item.lon);
                //     console.log("\n");                
                // });                
                next(null, list);
            }
        }
    );
};
