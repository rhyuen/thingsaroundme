"use strict";

let today = new Date()
let month = today.getMonth();
let day = today.getDate();
let year = today.getFullYear() - 2000;
let url = `https://www.cineplex.com/Showtimes/any-movie/vancouver-bc?Date=${month}/${day}/${year}`;
console.log(url);
