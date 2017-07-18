"use strict";

const request = require("request");
const cheerio = require("cheerio");

let today = new Date()
let month = today.getMonth();
let day = today.getDate();
let year = today.getFullYear() - 2000;
let url = `https://www.cineplex.com/Showtimes/any-movie/vancouver-bc?Date=${month}/${day}/${year}`;


module.exports = (next) => {
     request(url, (err, res,body) => {
        if(err){
            console.log(err);
        }else{        
            let movieContainer = [];

            let $ = cheerio.load(body);        
            
            //ADDS THEATRE NAME
            $(".showtime-theatre").each(function(index, el){
                let theatreName = $(this).find($(".theatre-text")).text().trim();
                let theatreData = {name: theatreName, movies: []};                
                
                //ADDS MOVIE NAME
                $(this).find($(".grid__item.no-page-break-inside")).each(function(ind, elem){                
                    
                    //movie name determined
                    let movieName = $(this).find($(".movie-details-link-click")).text().trim();
                    let movieData = {name: movieName, showtimes: []};
                                        
                    $(this).find($(".grid__item.one-whole")).each(function(i, el){
                        
                        let marker = $(this);

                        //ADDS MOVIE TYPE
                        marker.find($(".movie-format-sprite.spriteV2")).each(function(i, el){                            
                            
                            let movieType = ($(this).attr("title") === "") ? "Regular": $(this).attr("title");
                            
                            //ADDS SHOWTIME                            
                            marker.find($(".showtime ")).each(function(i, el){                            
                                let showtimeData = {type: movieType, time: ""};
                                showtimeData.time = $(this).text().trim();
                                movieData.showtimes.push(showtimeData);                                
                            });                                                                                    
                        });                            
                    });                    
                    theatreData.movies.push(movieData);                                    
                }); 
                movieContainer.push(theatreData);               
            });
            next(null, movieContainer);
        }
    });
};