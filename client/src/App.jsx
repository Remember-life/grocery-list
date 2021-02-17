import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../../style.css';
import Main from './Main.jsx';
import Receipt from './Receipt.jsx';
import Results from './Results.jsx';
import Setting from './Setting.jsx';
import ManualOrReceipt from './ManualOrReceipt.jsx';

function App () {

  const [currOption, setCurrOption] = useState('manual');

  const [recomm, setRecomm] = useState('');
  const [list, setList] = useState('');

  useEffect(() => {
    const sessionData = JSON.parse(window.sessionStorage.getItem("recomm"));

    if (sessionData) {
      setRecomm(sessionData);
    }
  }, [])

  const handleDarkMode = () => {
    document.body.classList.toggle('dark-theme');
  };

  const handleRadioOption = (input) => {
    setCurrOption(currOption => input)
  };

  const handleList = (data) => {
    setList(data);
  };

  const handleRecommended = (data) => {
    setRecomm(data);

    window.sessionStorage.setItem("recomm", JSON.stringify(data));
  };

  return (
    <div id="main">
      <button type="button" className="light-or-dark" onClick={() => handleDarkMode()}>Dark Mode</button>
      <ManualOrReceipt
        current={currOption}
        handleOption={handleRadioOption}
      />
      <div style={header}> 🍓🥬🥕 Grocery List 🥕🥬🍓 </div>
      <Switch>
        <Route exact path="/"><Main handleList={handleList} handleRecommended={handleRecommended} /></Route>
        <Route path="/receipt"><Receipt /></Route>
        <Route path="/results"><Results user={recomm} cart={list}/></Route>
      </Switch>
    </div>
  )

}

const header = {
  position: 'absolute',
  top: '40px',
  left: '400px',
  fontSize: '180%',
  fontWeight: 'bold',
};


export default App;