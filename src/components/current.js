import React, { Component } from 'react'

import { WiDaySunny, WiCloudy, WiRain, WiDayThunderstorm, WiWindy, WiDayShowers } from 'react-icons/wi';
import { IoIosSnow } from 'react-icons/io';

import '../styles/current.scss';

export default class current extends Component {
    constructor(props){
        super(props);
        console.log(this.props)
    }
    DateConvertor(time,timezone){
        let getHour = new Date(time+(timezone*1000)).getUTCHours();
        if(getHour < 10){
            getHour = "0"+getHour;
        }
        let getMinute = new Date(time+(timezone*1000)).getMinutes();
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

    WeatherIcon(main){
        if (main === 'Thunderstorm') {
            return <WiDayThunderstorm />;
        } else if (main === 'Drizzle') {
            return <WiDayShowers />;
        } else if (main === 'Rain') {
            return <WiRain/>;
        } else if (main === 'Snow') {
            return <IoIosSnow />;
        } else if (main === 'Clear') {
            return <WiDaySunny style={{color: "#fcbf1e"}}/>;
        } else if (main === 'Clouds') {
            return <WiCloudy />;
        } else {
            return <WiWindy />;
        }
    }

    render(props) {
        const {city, country, temperature, feels_like, description, main, sunrise, sunset, timezone, humidity, wind_speed, wind_deg} = this.props.currentWeather;
        return (
            <div className="current">
                <h2 className="current__title">{city}, {country} </h2>
                <div className="current__wrapper">
                    <div className="current__wrapper__icon">{this.WeatherIcon(main)}</div>
                    <div className="current__wrapper__detail">
                        <div className="current__wrapper__detail-temp">{temperature}<span className="current__wrapper__detail-temp-unit">&deg;C</span></div>
                        <div className="current__wrapper__detail-desc">{description}</div>
                        <div className="current__data">
                            <div className="current__wrapper__detail-data"><span className="current__wrapper__detail-label">Feels like </span>{feels_like}&deg;C</div>
                            <div className="current__wrapper__detail-data"><span className="current__wrapper__detail-label">Humidity </span>{humidity}%</div>
                            <div className="current__wrapper__detail-data"><span className="current__wrapper__detail-label">Sunrise </span>{this.DateConvertor(sunrise,timezone)}</div>
                            <div className="current__wrapper__detail-data"><span className="current__wrapper__detail-label">Sunset </span>{this.DateConvertor(sunset,timezone)}</div>
                            <div className="current__wrapper__detail-data"><span className="current__wrapper__detail-label">Wind </span>{wind_speed}km/h {this.WindDirectionConvertor(wind_deg)}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}