import React, { Component } from 'react'

import SearchBar from './search.js';
import CurrentWeather from './current.js';
import ForecastWeather from './forecast.js';

import '../styles/error.scss';


export default class weather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            city: 'vancouver',
            currentWeather: {},
            forecastWeather: {forecastList: [],timezone: 0},
            error: '',
            isLoaded: false
        };
        this.getWeather = this.getWeather.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
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
                let timeZoneOffset = forecastResult.city.timezone;
                console.log(`timeZoneOffset ${timeZoneOffset}`)
                for(let i = 0; i < forecastResult.list.length; i++){
                    forecast.push(this.forecastDataHandler(forecastResult.list[i],timeZoneOffset));
                }
                console.log(forecast);
                this.setState({
                    forecastWeather: {
                        forecastList: forecast,
                        timezone: timeZoneOffset
                    },
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
            main: data.weather[0].main,
            weather_icon: data.weather[0].icon,
            description: data.weather[0].description, 
            temperature: Math.floor(data.main.temp),
            feels_like: Math.floor(data.main.feels_like),
            humidity: data.main.humidity,
            wind_speed: Math.round(data.wind.speed * 3.6),
            wind_deg: data.wind.deg,
            sunrise: data.sys.sunrise*1000,
            sunset: data.sys.sunset*1000,
            timezone: data.timezone
        }
    
        if (data.weather[0].icon) {
            dataMapping.icon = data.weather[0].icon;
        }

        return dataMapping;
    }

    forecastDataHandler = (data, timeZoneOffset) => {
        const dataMapping ={
            date: (data.dt+timeZoneOffset)*1000,
            temperature: Math.floor(data.main.temp),
            condition: data.weather[0].description,
            main:data.weather[0].main,
            weather_id: data.weather[0].id,
            weather_icon: data.weather[0].icon,
            dateNum: new Date((data.dt+timeZoneOffset)*1000).getDate()
        }

        return dataMapping
    }

    handleResponse(response) {
        console.log(response)
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error: Location " + response.statusText);
        }
    }

    onSearchChange(cityName){
        this.getWeather(cityName);
        this.getForecast(cityName);
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
                    <SearchBar onSearchChange={this.getWeather}></SearchBar>
                    <div className="error">{error}</div>
                </div>
            )
                
        } else {
            return (
                <div>
                    <SearchBar onSearchChange={this.onSearchChange}></SearchBar>
                    <CurrentWeather currentWeather={currentWeather}></CurrentWeather>
                    <ForecastWeather forecastWeather={forecastWeather}></ForecastWeather>
                </div>
            )
        }
    }
}
