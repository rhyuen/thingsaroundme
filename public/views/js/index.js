"use strict";

console.log("hi");
$.getJSON("/api/eventbrite", (eventbrite_data) => {
    console.log(eventbrite_data);
    let eventData = eventbrite_data.val;
    eventData.forEach((ev) => {
        $("#mp--ev").append($("<div/>", {text: ev.name}));
    });
});

$.getJSON("/api/meetup", (meetup_data) => {
    console.log(meetup_data);
    let eventData = meetup_data.meetupData;
    eventData.forEach((ev) => {
        $("#mp--mu").append($("<div/>", {text: ev.name}));
    });
});