import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Main from './Main.jsx';
import Results from './Results.jsx';
import Setting from './Setting.jsx';

function App () {

  return (
    <div className="main" style={main}>
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

const main = {
  // width: "100vw",
  // height: "100vh",
  background: "rgba(234, 170, 91, 1)",
  fontFamily: "Comic Sans MS",
}

const header = {
  flex: "95%",
  display: "inline-block",
  paddingLeft: "260px",
  // color: "white",
  // fontFamily: "Comic Sans MS",
}

const carrot = {
  flex: "5%",
  display: "inline-block",
}


export default App;