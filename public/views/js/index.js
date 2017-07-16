"use strict";

console.log("hi");
$.getJSON("/api/eventbrite", (eventbrite_data) => {
    console.log(eventbrite_data);
    let eventData = eventbrite_data.val;
    eventData.forEach((ev) => {
        $("#mp--ev")
            .append($("<div/>", {class: "item"})
            .append($("<div/>", {class: "item__name"})
            .append($("<a/>", {href: ev.url, text: ev.name}))
            .append($("<div/>", {text: ev.venue_name}))
            .append($("<div/>", {class: "item__date", text: formatDate(ev.startTime)}))));
    });
});

$.getJSON("/api/meetup", (meetup_data) => {
    console.log(meetup_data);
    let eventData = meetup_data.meetupData;
    eventData.forEach((ev) => {
        $("#mp--mu")
            .append($("<div/>", {class: "item"})
            .append($("<div/>", {class: "item__name"})
            .append($("<a/>", {href: ev.url, text: ev.name}))
            .append($("<div/>", {text: ev.group_name}))
            .append($("<div/>", {class: "item__date", text: formatDate(ev.date)}))));
    });
});

function formatDate(unformmated){
    "2017-07-16T20:15:00.000Z"
    let yyyymmdd = unformmated.split("T")[0];
    let mm = yyyymmdd.split("-")[1];
    let dd = yyyymmdd.split("-")[2];
    let time = unformmated.split("T")[1].split(":")[0] + ":" + unformmated.split("T")[1].split(":")[1];
    return [mm, dd, time];
}