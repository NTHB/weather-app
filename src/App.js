import React, {Component} from 'react';
import './App.scss';

import Header from './components/header'
import Search from './components/searchBar'
import Footer from './components/footer'

class App extends Component {
  state = {
    city: '',
    currentWeather: {},
    forecastWeather: [],
    error: ''
  }

  getWeather(cityName){
    console.log(`getWeather called ${cityName}`);
    // fetch(
    //     `http://api.openweathermap.org/data/2.5/weather/?q=${cityName}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
    // ).then(respond => this.handleResponse(respond))
    // .then(weather => {
    //     if(Object.entries(weather).length) {
    //         console.log(weather);
    //         let mappedData = this.dataHandler(weather);
    //         console.log(mappedData)
    //         this.setState({
    //             currentWeather: mappedData
    //         });
    //     }
    // })
    // .catch(error => {
    //     console.log('fetching data error');
    //     this.setState({
    //         error: error.message
    //     });
    // });
  }
  render() {
    return (
      <div className="App">
        <Header></Header>
        <Search></Search>
        <Footer></Footer>
      </div>
    );
  }
  
}

export default App;
