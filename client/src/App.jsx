import React, { useState, useEffect } from 'react';
import { useHistory, BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../../style.css';
import Main from './Main.jsx';
import Receipt from './Receipt.jsx';
import Results from './Results.jsx';
import Setting from './Setting.jsx';
import ManualOrReceipt from './ManualOrReceipt.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

function App () {

  const history = useHistory();

  const [currOption, setCurrOption] = useState('manual');

  const [recomm, setRecomm] = useState('');
  const [list, setList] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      { isLoggedIn
        ? <div>my list</div>
        : <div style={auth}>
            <button className="auth" type="button" onClick={() => { history.push('/login')}}>Log In</button>
            <button className="auth" type="button" onClick={() => {
              history.push('/signup')
            }}>Sign Up</button>
          </div>
      }
      <Switch>
        <Route exact path="/"><Main handleList={handleList} handleRecommended={handleRecommended} /></Route>
        <Route path="/receipt"><Receipt /></Route>
        <Route path="/results"><Results user={recomm} cart={list}/></Route>
        <Route path="/login"><Login /></Route>
        <Route paht="/signup"><Signup /></Route>
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

const auth = {
  position: 'absolute',
  top: '40px',
  right: '100px',
}


export default App;