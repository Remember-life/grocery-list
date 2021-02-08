import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../../style.css';
import Main from './Main.jsx';
import Results from './Results.jsx';
import Setting from './Setting.jsx';

function App () {

  const handleDarkMode = () => {
    document.body.classList.toggle('dark-theme');
  }


  return (
    <div id="main">
      <button type="button" className="light-or-dark" onClick={() => handleDarkMode()}>Dark Mode</button>
      <h1 style={header}>Grocery List</h1>
      <div className="carrot" style={carrot}>🥕🥬🍓</div>
        <Main />
      {/* <Switch>
        <Route exact path="/"><Main /></Route>
        <Route path="/results"><Results /></Route>
      </Switch> */}
    </div>
  )

}

const header = {
  flex: "95%",
  display: "inline-block",
  paddingLeft: "260px",
  fontSize: "150%",
}

const carrot = {
  flex: "5%",
  display: "inline-block",
}

export default App;