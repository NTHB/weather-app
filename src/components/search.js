import React, { Component } from 'react'

import { FaSearch } from 'react-icons/fa'

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
            <div>
                <form action="" autoComplete="on">
                    <div>
                        <label htmlFor="city-input"><FaSearch></FaSearch></label>
                        <input type="text" 
                        name="city-input" 
                        id="search-input" 
                        placeholder="City Name"
                        onChange={this.handleChange}/>
                    </div>
                </form>
            </div>
        )
    }
}
