import React, {Component} from "react";
import PropTypes from "prop-types";
import Movie from "./movie.jsx";

class Theatre extends Component{
    constructor(props){
        super(props);
        this.shortenName = this.shortenName.bind(this);
    }

    shortenName(name){
        return name.replace(/(Theatre|Cineplex|Cinemas|Vancouver|Odeon)/g, "");        
    }

    render(){        
        let list_of_movies = this.props.movieList.map((movie, index) => {
            return (                
                <Movie key = {index} movieName = {movie.name} movieTimes = {movie.showtimes}/>                
            );
        });

        return(
            <div>
                <h1>{this.shortenName(this.props.theatreName)}</h1>
                <div>{list_of_movies}</div>
            </div>           
        );
    }
}

Theatre.PropTypes = {
    theatreName: PropTypes.string,
    movieList: PropTypes.array
};

export default Theatre;