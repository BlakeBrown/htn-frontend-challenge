import React, { Component } from 'react';
import HelloWorld from './components/HelloWorld';
import HackerList from './components/HackerList';
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
        <section>
          <HackerList />
        </section>
      </div>
    );
  }
}

export default App;
