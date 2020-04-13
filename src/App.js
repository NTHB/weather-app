import React, {Component} from 'react';
import './App.scss';

import Header from './components/header'
import Weather from './components/weather'
import Footer from './components/footer'

require('dotenv').config();

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header></Header>
        <Weather></Weather>
        <Footer></Footer>
      </div>
    );
  }
  
}

export default App;
