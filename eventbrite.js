"use strict";

const request = require("request");
const async = require("async");
const config = require("./config.js");
const cache = require("./redisconn.js");
const apiKey = config[process.env.NODE_ENV].eventbrite;
const token = `?token=${apiKey}`;

const targetURL = `https://www.eventbriteapi.com/v3/events/search/?location.address=Vancouver&location.within=10km&start_date.keyword=this_week&token=${apiKey}`;
const venueURL = "https://www.eventbriteapi.com/v3/venues/";


const options = {
    url: targetURL,
    method: "GET",    
    headers: {
        "Content-Type": "application/json",
        "Accept-Charset": "utf-8",
        "Authorization": `Bearer ${apiKey}`
    },      
};

module.exports = (next) =>{
    
    request.get(targetURL, (zaerr, res, zabody) => {
        if(zaerr){
            return console.error("Header Request Error");
        }
        let headerData = JSON.parse(zabody);
        let pageNumber = headerData.pagination.page_number - 1;
        let pageCount = headerData.pagination.page_count + 1;
        console.log("PAGENUMBER: %s", pageNumber);
        console.log("TOTAL PAGE COUNT %s", pageCount);
      
        let container = [];
        let gpsList = [];

        async.whilst(

            //WHILE LOOP CONDITION
            () => {
                console.log("CONDITION: %s", pageNumber);
                console.log("LIMIT %s", pageCount);
                return (pageNumber <= pageCount );
            },

            //GET DATA ON EVERY PAGE.
            (next) => {        
                request.get(targetURL+"&page="+ pageNumber, (err, res, body) => {
                                        
                    let data = JSON.parse(body);
                                        
                    data.events.forEach((item) => {
                        //Make API CALL for VenueID information
                        cache.getCachedVenue(item.venue_id, (err, stored_location) => {
                            if(err){
                                console.log("ERROR %s", err);
                            }else{
                                let curr_container = [];                                
                                
                                if(!stored_location){
                                    console.log("No cached locationId exists for %s.", item.venue_id);
                                    request(venueURL + item.venue_id + token, (err, res, ven_body) => {
                                        if(err){
                                            console.log(err);
                                        }else{                                            
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
                                            // console.log("NAME: %s | PAGE: %s", item.name.text, pageNumber);
                                            const location_details = {
                                                venue_name: venue_data.name,
                                                lat: venue_data.address.latitude,
                                                lon: venue_data.address.longitude
                                            };
                                            cache.cacheVenue(item.venue_id, location_details, (err, status) => {
                                                if(err){
                                                    console.log("FAILURE TO CACHE. %s", err);
                                                }else{
                                                    console.log("CACHE SUCCESS: %s", status);                                                
                                                }
                                            });
                                            container.push(...curr_container);                       
                                        }                        
                                    });
                                }else{                                    
                                    curr_container.push({
                                                name: item.name.text,
                                                startTime: item.start.local,
                                                url: item.url,
                                                venueId: item.venue_id,
                                                currency: item.currency,
                                                free: item.is_free,
                                                language: item.locale,
                                                venue_name: (stored_location.venue_name === "null") ? "None Listed": stored_location.venue_name,
                                                lat: stored_location.lat,
                                                lon: stored_location.lon
                                            });
                                    container.push(...curr_container);
                                }                                                                                
                            }                            
                        });                                                                                                    
                        // console.log("COUNT: %s | PAGE %s", data.events.length, pageNumber);                
                    });                      
                    pageNumber++;
                    next(null, container);
                });                
            },

            //EVENTS ON ALL PAGES
            (err, list) => {
                if(err){
                    console.log(err);            
                }else{                
                    // list.forEach((item) => {                    
                    // console.log(item);
                    // });   
                    console.log("Total Eventbrite result count: %s", list.length);
                    next(null, list);
                }
            }
        );
    });
};
