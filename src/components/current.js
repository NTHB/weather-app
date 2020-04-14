import React, { Component } from 'react'

export default class current extends Component {
    constructor(props){
        super(props);
        console.log(this.props)
    }
    render(props) {
        const {city, country, temperature, description} = this.props.currentWeather;
        return (
            <div>
                <h2>{city}, {country} </h2>
                <div>Today</div>
                <div>{temperature}&deg;C</div>
                <div>{description}</div>
                <br />
            </div>
        )
    }
}