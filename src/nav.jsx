import React, {Component} from "react";

class Nav extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div className = "nav">
                <div className = "nav__header">ThingsAroundMe</div>
                <div className = "nav__controls">
                    <span onClick = {this.props.toggleMovies.bind(this)}>Movies</span>
                    <br/>
                    <span onClick = {this.props.toggleMeetup.bind(this)}>Eventbrite</span>
                    <br/>
                    <span onClick = {this.props.toggleEventbrite.bind(this)}>Meetup</span>                    
                </div>
            </div>
        );        
    }
}

export default Nav;