import logo from '../Images/logo.png';
import '../Stylesheets/Header.css';
import { FaGithub } from 'react-icons/fa';
import React from "react";
function App() {
  return (
    <div className="App">
      <header className="App-header">
       <h1>Stonks</h1>
       <span className="visually-hidden">Github</span>
       <FaGithub />
      </header>
    </div>
  );
}

export default App;
