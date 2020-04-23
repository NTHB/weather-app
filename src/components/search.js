import React, { Component } from 'react';

import { FaSearch } from 'react-icons/fa';

import '../styles/search.scss';

export default class search extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    typingTimer = null;

    handleChange(e){
        let cityName = e.target.value;
        console.log(cityName)
        clearTimeout(this.typingTimer);
        if(cityName !== null && cityName !== ''){
            this.typingTimer =  setTimeout(() => {
                console.log(`Delay Called >> ${cityName}`)
                this.props.onSearchChange(cityName);
            }, 1250);
        }
        
       
    }

    render() {
        return (
            <div className="search">
                <form action="" autoComplete="on" className="search__form">
                    <div>
                        <label htmlFor="city-input" className="search__form-label"><FaSearch className="search__form-label-icon"></FaSearch></label>
                        <input type="text" 
                        name="city-input" 
                        id="search-input" 
                        placeholder="City Name"
                        onChange={this.handleChange}
                        className="search__form-input"
                        />
                    </div>
                </form>
            </div>
        )
    }
}
