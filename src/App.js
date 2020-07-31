import React from 'react';
// import logo from './logo.svg';
import './styles/App.css';

// mock api
import { mockXHR } from './mockjs'
if (process.env.NODE_ENV  === 'development') {
  mockXHR()
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
          <div className='App-logo'>
              hello,world
          </div>
      </header>
    </div>
  );
}

export default App;
