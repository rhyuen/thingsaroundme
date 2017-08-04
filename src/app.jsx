import React, {Component} from "react";
import Nav from "./nav.jsx";
import Theatre from "./theatre.jsx";
import Presentation from "./presentation.jsx";

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            eventbrite: {
                visible: true,
                data: []
            },
            meetup: {
                visible: true,
                data: []
            },
            movies: {
                visible: true,
                data: []
            }            
        };        
        this.handleRadio = this.handleRadio.bind(this);
    }

    handleRadio(evt, data){        
        const selected = evt.currentTarget.innerText.toString().toLowerCase();
        this.setState((prevState) => {            
            let state = {
                eventbrite: {
                    data: prevState.eventbrite.data,
                    visible: false
                },
                meetup: {
                    data: prevState.meetup.data,
                    visible: false
                },
                movies: {
                    data:  prevState.movies.data,
                    visible: false
                }
            };             
            state[selected].visible = true;
            return state;
        });
    }
    
    componentDidMount(){
        const endpoints = [
            "http://localhost:1990/api/movies",
            "http://localhost:1990/api/meetup",
            "http://localhost:1990/api/eventbrite"
        ];

        endpoints.forEach((url) => {
            fetch(url, {
                    headers: {
                        "Accept": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "mode": "cors",
                        "Content-Type": "application/json"
                    }, method: "GET"                
                })
                .then((res) => {
                    if(res.ok){
                        return res.json();
                    }
                    throw new Error("Network res not okay." + url);
                }) 
                .then((res) => {
                    console.log(res);

                    if(res.movieData){
                        this.setState({
                            movies: {
                                data: res.movieData
                            }
                        });
                    }else{
                        if(res.meetupData){
                            this.setState({
                                meetup: {
                                    data: res.meetupData
                                }                                
                            });
                        }
                        if(res.eventbriteData){
                            this.setState({
                                eventbrite: {
                                    data: res.eventbriteData
                                }
                            });
                        }
                    }                    
                })
                .catch((err) => {
                    if(err){
                        console.log(err);
                    }else{
                        console.log("stuff");
                    }
            });
        });        
    }

    render(){                
        return (
            <div>
                <Nav toggleMovies = {this.handleRadio} 
                    toggleMeetup = {this.handleRadio}
                    toggleEventbrite = {this.handleRadio}/>
                <div className = "event-container">
                    <Presentation 
                        meetup = {this.state.meetup} 
                        eventbrite = {this.state.eventbrite}
                        movies = {this.state.movies}/>                    
                   
                </div>
            </div>
        );        
    }
}

export default App;