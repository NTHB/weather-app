import React, { Component } from 'react'

import { WiDaySunny, WiCloudy, WiRain, WiDayThunderstorm, WiWindy, WiDayShowers } from 'react-icons/wi';
import { IoIosSnow } from 'react-icons/io';

import '../styles/forecast.scss';

export default class forecast extends Component {
    constructor(props){
        super(props)
        console.log(this.props.forecastWeather)
        
    }
    
    DateConvertor(time){
        let convertedDate ="";
        var dateOfWeek = new Date(time).getDay();
        let dateArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        var date = new Date(time).getDate();
        var month =  (new Date(time).getMonth())+1;
        convertedDate = dateArray[dateOfWeek] + " " + date + "/" + month;

        return convertedDate;
    }
    FindMostOccurrence(items){
        let counts = items.reduce((count, item) => {
            count[item] = (count[item] || 0) + 1;
            return count;
        }, {});
        let maxCount = Math.max(...Object.values(counts));
        let mostFrequent = Object.keys(counts).filter(key => counts[key] === maxCount);
        
        console.log(mostFrequent);
        return mostFrequent[0]
    }

    DataHandler(forecastList){

        const groupForecast = forecastList.reduce((result, forecast) =>{
            result[forecast.dateNum.toString()] = result[forecast.dateNum.toString()] || [];
            result[forecast.dateNum.toString()].push(forecast)
            return result;
        },{});
        console.log(groupForecast);

        const forecastArray = [];
        for(const arrayForecast in groupForecast){
            // console.log(`${arrayForecast}: ${groupForecast[arrayForecast]}`);
            let max = [];
            let min = [];
            let weather_icon = [];
            let dateDT = [];
            let date = arrayForecast;
            for(const eachHour of groupForecast[arrayForecast]){
                // console.log(eachHour)
                max.push(eachHour.temperature);
                min.push(eachHour.temperature);
                weather_icon.push(eachHour.main);
                dateDT.push(eachHour.date);
            }
            const forecastObject = {
                date: date,
                min: Math.min(...min),
                max: Math.max(...max),
                weather_icon: this.FindMostOccurrence(weather_icon),
                dateDT: Math.max(...dateDT)
            }
            // console.log(forecastObject);
            forecastArray.push(forecastObject);
        }
        console.log(forecastArray)
        
        return forecastArray
    }

    WeatherIcon(main){
        if (main === 'Thunderstorm') {
            return <WiDayThunderstorm />;
        } else if (main === 'Drizzle') {
            return <WiDayShowers />;
        } else if (main === 'Rain') {
            return <WiRain />;
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


    render() {
        const forecastList = this.DataHandler(this.props.forecastWeather.forecastList.filter((forecast) =>
                new Date(forecast.date).getMonth > new Date().getMonth || forecast.dateNum > new Date().getDate()
            )).map((forecast, index) => (
                <div key={index} className="forecast__date">
                    <div className="forecast__date-name">{this.DateConvertor(forecast.dateDT)}</div>
                    <div className="forecast__date-icon">{this.WeatherIcon(forecast.weather_icon)}</div>
                    <div className="forecast__date-temp">
                        <div>H:<span className="forecast__date-temp-max">{forecast.max}</span>&deg;C / L:<span className="forecast__date-temp-min">{forecast.min}</span>&deg;C</div>
                    </div>
                </div>
            ));

        
            return (
                <div className="forecast">{forecastList}</div>
            )
    }
        
}

