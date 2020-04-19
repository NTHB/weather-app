import React, { Component } from 'react'

export default class current extends Component {
    constructor(props){
        super(props);
        console.log(this.props)
    }
    DateConvertor(time){
        let getHour = new Date(time).getHours();
        if(getHour < 10){
            getHour = "0"+getHour;
        }
        let getMinute = new Date(time).getMinutes();
        if(getMinute < 10){
            getMinute = "0"+getMinute;
        }
        var timeOfDay = getHour + ":"  + getMinute;
        return timeOfDay;
    }

    WindDirectionConvertor(deg){
        let windDegree = Math.round(deg/22.5)
        let directionArray=["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
        return directionArray[(windDegree % 16)]
    }

    render(props) {
        const {city, country, temperature, feels_like, description, weather_icon, sunrise, sunset, humidity, wind_speed, wind_deg} = this.props.currentWeather;
        return (
            <div>
                <h2>{city}, {country} </h2>
                <div>Today</div>
                <div>{temperature}&deg;C</div>
                <img src={`http://openweathermap.org/img/wn/${weather_icon}@2x.png`} alt={weather_icon}></img>
                <div>{description}</div>
                <div>Feels like {feels_like}&deg;C</div>
                <div>Humidity {humidity}%</div>
                <div>Sunrise {this.DateConvertor(sunrise)}</div>
                <div>Sunset {this.DateConvertor(sunset)}</div>
                <div>Wind Speed {wind_speed}km/h {this.WindDirectionConvertor(wind_deg)}</div>
                <br />
            </div>
        )
    }
}