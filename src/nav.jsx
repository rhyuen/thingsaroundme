import React, {Component} from "react";

class Nav extends Component{
    render(){
        return(
            <div className = "nav">
                <div className = "nav__header">ThingsAroundMe</div>
                <div className = "nav__controls">
                    <span>Movies</span>
                    <span>Events</span>
                    <span>Date</span>
                    <span>Dist</span>
                </div>
            </div>
        );        
    }
}

export default Nav;