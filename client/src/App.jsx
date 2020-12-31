import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Main from './Main.jsx';

function App () {

  return (
    <div className="main" style={main}>
      <h1 style={header}>Grocery List</h1>
      <div className="carrot" style={carrot}>🥕</div>
      <Main />
    </div>
  )

}

const main = {
  width: "100vw",
  height: "100vh",
  background: "green",
}

const header = {
  flex: "95%",
  display: "inline-block",
}

const carrot = {
  flex: "5%",
  display: "inline-block",
}


export default App;