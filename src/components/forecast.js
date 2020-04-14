import React, { Component } from 'react'

export default class forecast extends Component {
    constructor(props){
        super(props)
        console.log(this.props.forecastWeather)
    }

    dateconvertor(time){
        var dateOfWeek = new Date(time).getDay();
        let dateArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturnday"];
        return dateArray[dateOfWeek]
    }
    render() {
        const forecastList = this.props.forecastWeather.map((forecast) => (
            <div>
                <div>{this.dateconvertor(forecast.date)}</div>
                <div>{forecast.temperature}&deg;C</div>
                <div>{forecast.description}</div>
                <br />
            </div>
        ));

        return (
            <div>{forecastList}</div>
        );
    }
}
