import React, { Component } from 'react'
import { FaSearch } from 'react-icons/fa'


export default class searchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            city: 'vancouver',
            currentWeather: {},
            forecastWeather: [],
            error: ''
        };
    }

    componentDidMount() {
        this.setState({
            error: ''
        });
        this.getWeather(this.state.city);
    }

    typingTimer = null;

    handleChange(inputCity){
        console.log(`inputCity>>${inputCity}`)

        clearTimeout(this.typingTimer);
        this.typingTimer =  setTimeout(() => {
            console.log(`Delay Called >> ${inputCity}`)
            this.getWeather(inputCity);
        }, 1500);
    }

    handleResponse(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error: Location " + response.statusText);
        }
    }

    getWeather(cityName){
        console.log(`getWeather called ${cityName}`);
        fetch(
            `http://api.openweathermap.org/data/2.5/weather/?q=${cityName}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        ).then(respond => this.handleResponse(respond))
        .then(weather => {
            if(Object.entries(weather).length) {
                console.log(weather);
            }
        })
        .catch(error => {
            console.log('fetching data error');
            this.setState({
                error: error.message
            });
        });
    }

    dataHandler =(data)=> {
        
    }

    render() {
        
        return (
            <div>
                <form action="" autoComplete="off">
                    <div>
                        <label htmlFor="city-input"><FaSearch></FaSearch></label>
                        <input type="text" name="city-input" id="search-input" placeholder="City" onChange={event=>this.handleChange(event.target.value)}/>
                    </div>
                </form>

            </div>
        )
    }
}
