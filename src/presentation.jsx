import React, {Component} from "react";
import Theatre from "./theatre.jsx";
import PropTypes from "prop-types";

class Presentation extends Component{
    
    render(){
        const list_of_theatres = this.props.movies.data.map((thr, index) => {
            return (
                <Theatre key = {index} theatreName = {thr.name} movieList = {thr.movies} />
            );
        });
        const list_of_eventbrite = this.props.eventbrite.data.map((eb, index) => {
            return (
                <li key = {index}>
                    <span><strong>{eb.startTime}</strong></span>
                    <a href = {eb.url} target = "_blank">{eb.name} at {eb.venue_name}</a>
                </li>
            );
        });
        
        const list_of_meetup = this.props.meetup.data.map((mu, index) => {
            return (
                <li key = {index}>
                    <span><strong>{mu.date}</strong></span>                    
                    <a href = {mu.url} target = "_blank">{mu.name} | {mu.group_name}</a>
                </li>
            )
        });

        return (
            <div>
                <ul className = {this.props.movies.visible ? "toggledOn" : "toggledOff"}>
                    {list_of_theatres}
                </ul>
                <ul className = {this.props.eventbrite.visible ? "toggledOn" : "toggledOff"}>
                    {list_of_eventbrite}
                </ul>
                <ul className = {this.props.meetup.visible ? "toggledOn" : "toggledOff"}>
                    {list_of_meetup}
                </ul>
            </div>
        );
    }
}

Presentation.PropTypes = {
    meetup: PropTypes.array,
    eventbrite: PropTypes.array,
    movies: PropTypes.array
};

export default Presentation;