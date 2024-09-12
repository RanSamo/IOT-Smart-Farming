import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';



function App() {
  const [data, setData] = useState(null);
  const [showData, setShowData] = useState(false);
  const [x, setX] = useState(50);

  useEffect(() => {
    fetch('/api/data') // No need to include localhost:5000 if proxy is set up
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const printData = (mishtane) => {
    console.log(mishtane);
    setX(x+1);
    console.log(x);
    setShowData(true);
    console.log(data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={()=>(printData(100))}>Print Data</button>
        <p>{x}</p>
        {showData && <p>{data.message}</p>}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
 
export default App;
