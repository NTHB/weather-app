import React, { Component } from 'react'

export default class forecast extends Component {
    constructor(props){
        super(props)
        console.log(this.props.forecastWeather)
        
    }
    
    DateConvertor(time){
        let convertedDate ="";
        var dateOfWeek = new Date(time).getDay();
        let dateArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturnday"];
        var date = new Date(time).getDate();
        var month =  (new Date(time).getMonth())+1;
        convertedDate = dateArray[dateOfWeek] + date + "/" + month;

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
                weather_icon.push(eachHour.weather_icon);
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


    render() {
        const forecastList = this.DataHandler(this.props.forecastWeather.forecastList.filter((forecast) =>
                forecast.dateNum !== new Date().getDate()
            )).map((forecast, index) => (
                <div key={index}>
                    <div>{this.DateConvertor(forecast.dateDT)}</div>
                    <img src={`http://openweathermap.org/img/wn/${forecast.weather_icon}@2x.png`} alt={forecast.weather_icon}></img>
                    {/* <div>{forecast.weather_icon}</div> */}
                    <div>High{forecast.max}&deg;C</div>
                    <div>Low{forecast.min}&deg;C</div>
                    <br />
                </div>
            ));

        
            return (
                <div>{forecastList}</div>
            )
    }
        
}

//     render() {
//         // const forecastList = DataMapping(this.props.forecastWeather)
//         const forecastList = this.props.forecastWeather.forecastList.map((forecast, index) => (
//             <div key={index}>
//                 <div>{this.DateConvertor(forecast.date)}</div>
//                 <div>{forecast.temperature}&deg;C</div>
//                 <div>{forecast.description}</div>
//                 <div>High&deg;C</div>
//                 <div>Low&deg;C</div>
//                 <br />
//             </div>
//         ));

//         return (
//             <div>{forecastList}</div>
//         );
//     }
// }


// date: (data.dt+timeZoneOffset)*1000,
//             temperature: 11.36,
//             condition: "broken clouds",
//             weather_id: 803,
//             weather_icon: "04d",
//             dateNum: 17

// forecast{
//     date: <<dateNum,
//     min: <<temp,
//     max: <<temp,
//     icon: <<weather_icon
// }

