import React from 'react';
import './App.scss';

import Header from './components/header'
import Search from './components/searchBar'
import CurrentWeather from './components/current'
import Forecast from './components/forecast'
import Footer from './components/footer'

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Search></Search>
      <CurrentWeather></CurrentWeather>
      <Forecast></Forecast>
      <Footer></Footer>
    </div>
  );
}

export default App;
