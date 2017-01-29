import React, { Component } from 'react';
import HelloWorld from './components/HelloWorld';
import './App.css';
import logoSvg from './assets/logo.svg'

class App extends Component {
  render() {
    return (
      <div>
        <header className='header'>
          <div className='logo'>
            <img src={logoSvg}/>
          </div>
          <h1>Hack the North Frontend Challenge</h1>
        </header>
        <section>
          <HelloWorld />
        </section>
      </div>
    );
  }
}

export default App;
