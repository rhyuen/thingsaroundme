import React, {Component} from "react";
import PropTypes from "prop-types";

class Movie extends Component{
    

    render(){
        let list_of_times = this.props.movieTimes.map((show) => {
            return (
                <li>{show.type} | {show.time}</li>
            );
        });

        return (
            <div>
                <h3>{this.props.movieName}</h3>
                <ul>{list_of_times}</ul>
            </div>
        );
    }
}

Movie.PropTypes = {
    movieName: PropTypes.string,
    movieTimes: PropTypes.array
};

export default Movie;