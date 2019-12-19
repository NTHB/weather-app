import React, { Component } from 'react'

export default class current extends Component {
    render(props) {
        const {currentWeather} = props.currentWeather;
        return (
            <div>
                hello from current
                <h2>{currentWeather.city}</h2>
                <div>{currentWeather.temperature}&deg;C</div>
                <div>{currentWeather.description}</div>
            </div>
        )
    }
}