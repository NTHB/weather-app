import React, { Component } from 'react'

import SearchBar from './search.js';
import CurrentWeather from './current.js';
import ForecastWeather from './forecast.js';


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
                console.log(`weather >> ${weather}`);
                let mappedData = this.dataHandler(weather);
                console.log(mappedData)
                this.setState({
                    currentWeather: mappedData,
                    isLoaded: true,
                    error: ''
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

    getForecast(cityName) {
        console.log(`getForecast called ${cityName}`);
        fetch(
          `http://api.openweathermap.org/data/2.5/forecast/?q=${cityName}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        ).then(respond => this.handleResponse(respond))
        .then(forecastResult => {
            if (Object.entries(forecastResult).length) {
                console.log(`forecastResult ${forecastResult}`)
                const forecast = [];
                for (let i = 0; i < forecastResult.list.length; i += 8) {
                    forecast.push(this.dataHandler(forecastResult.list[i + 4]));
                }
                console.log(forecast);
                this.setState({
                    forecastWeather: forecast,
                    error: ''
                });
            }
        })
        .catch(error => {
            console.log(error);
            console.log('fetching forecast data error');
            this.setState({
                error: error.message
            });
            
        });;
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

        if (data.dt_txt) {
            dataMapping.dt_txt = data.dt_txt;
        }
    
        if (data.weather[0].icon) {
            dataMapping.icon = data.weather[0].icon;
        }
    
        if (data.main.temp_min && data.main.temp_max) {
            dataMapping.max = data.main.temp_max;
            dataMapping.min = data.main.temp_min;
        }

        return dataMapping;
    }

    handleResponse(response) {
        console.log(response)
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error: Location " + response.statusText);
        }
    }

    componentDidMount(){
        this.getWeather(this.state.city);
        this.getForecast(this.state.city);
    }

    render() {
        const {error, isLoaded, currentWeather, forecastWeather} = this.state;
        if(!isLoaded){
            return <div>Loading...</div>
        } else if(error){
            return (
                <div>
                    {error}
                    <SearchBar onSearchChange={this.getWeather}></SearchBar>
                </div>
            )
                
        } else {
            return (
                <div>
                    <SearchBar onSearchChange={this.getWeather}></SearchBar>
                    <CurrentWeather currentWeather={currentWeather}></CurrentWeather>
                    <ForecastWeather forecastWeather={forecastWeather}></ForecastWeather>
                </div>
            )
        }
    }
}
