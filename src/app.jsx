import React, {Component} from "react";
import Nav from "./nav.jsx";
import Theatre from "./theatre.jsx";

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            events: [],
            movies: [] 
        };
    }
 
    componentDidMount(){        
        fetch("http://localhost:1990/api/movies", {
                headers: {
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "mode": "cors",
                    "Content-Type": "application/json"
                },
                method: "GET"                
            })
            .then((res) => {
                if(res.ok){
                    return res.json();
                }
                throw new Error("Network res not okay.");
            }) 
            .then((res) => {
                console.log(res);
                this.setState({
                    events: res.movieData
                });
            })
            .catch((err) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("stuff");
                }
            });
    }

    render(){        
        function getMovies(theatre){
            let movies_in_theatre = theatre.map((m) => {
                return(
                    <span>{m.name}</span>
                );
            });
            return movies_in_theatre;
        }

        const list_of_theatres = this.state.events.map((thr) => {
            return (
                <Theatre theatreName = {thr.name} movieList = {thr.movies} />
            );
        });

        return (
            <div>
                <Nav/>
                <div className = "event-container">                    
                    <ul>                        
                        {list_of_theatres}
                    </ul>
                </div>
            </div>
        );        
    }
}

export default App;