import React, { Component } from 'react'

import SearchBar from './search.js';
import CurrentWeather from './current.js';


export default class weather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            city: 'vancouver',
            currentWeather: {},
            forecastWeather: [],
            error: '',
            isLoaded: false
        };
        this.getWeather = this.getWeather.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
    }

    
    getWeather(cityName){
        console.log(`getWeather called ${cityName}`);
        fetch(
            `http://api.openweathermap.org/data/2.5/weather/?q=${cityName}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        ).then(respond => this.handleResponse(respond))
        .then(weather => {
            if(Object.entries(weather).length) {
                console.log(weather);
                let mappedData = this.dataHandler(weather);
                console.log(mappedData)
                this.setState({
                    currentWeather: mappedData,
                    isLoaded: true
                });
            }
        })
        .catch(error => {
            console.log(error);
            console.log('fetching data error');
            this.setState({
                error: error.message
            });
            
        });
    }

    dataHandler =(data)=> {
        const dataMapping = {
            date: data.dt * 1000,
            city: data.name,
            country: data.sys.country,
            condition: data.cod,
            icon_id: data.weather[0].id,
            description: data.weather[0].description, 
            temperature: data.main.temp,
            humidity: data.main.humidity,
            wind_speed: Math.round(data.wind.speed * 3.6)
        }
        return dataMapping;
    }

    handleResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error: Location " + response.statusText);
        }
    }

    componentDidMount(){
        this.getWeather(this.state.city);
    }

    render() {
        const {error, isLoaded, currentWeather} = this.state;
        if(!isLoaded){
            return <div>Loading...</div>
        } else {
            return (
                <div>
                    <SearchBar onSearchChange={this.getWeather}></SearchBar>
                    <CurrentWeather currentWeather={currentWeather}></CurrentWeather>
                </div>
            )
        }
    }
}
