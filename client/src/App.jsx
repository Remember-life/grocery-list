import React, { useState, useEffect } from 'react';
import { useHistory, useParams, BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Main from './Main.jsx';
import Receipt from './Receipt.jsx';
import Results from './Results.jsx';
import Setting from './Setting.jsx';
import ManualOrReceipt from './ManualOrReceipt.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import User from './User.jsx';

function App () {

  const history = useHistory();
  let { user } = useParams();

  const [currOption, setCurrOption] = useState('manual');

  const [recommNutrients, setRecommNutrients] = useState('');
  const [listNutrients, setListNutrients] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('Guest');

  const [savedList, setSavedList] = useState('');

  useEffect(() => {
    const sessionData = JSON.parse(window.sessionStorage.getItem("recomm"));

    if (sessionData) {
      setRecommNutrients(sessionData);
    }
  }, [])

  const handleDarkMode = () => {
    document.body.classList.toggle('dark-theme');
  };

  const handleRadioOption = (input) => {
    setCurrOption(currOption => input)
  };

  const handleList = (data) => {
    setListNutrients(data);
  };

  const handleRecommended = (data) => {
    setRecommNutrients(data);

    window.sessionStorage.setItem("recomm", JSON.stringify(data));
  };

  const handleLoginStatus = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  }

  const handleLogoutStatus = () => {
    setIsLoggedIn(false);
    setUsername('Guest');
    // clear all the inputFields
    window.sessionStorage.clear();
    // invalidate the token
      // if httpOnly parameter is set to false
      // document.cookie = 'jwt=; Path=/; max-age=0';
      // console.log(document.cookie);
    axios.get('/logout')
    .then(function (response) {
      console.log('User is logged out')
    })
    .catch(function (error) {
      console.log('Error in logging out the user - ', error);
    })

    history.push('/');
  }

  const handleSavedList = (list) => {
    setSavedList(list);
  }
  console.log('APP, savedList', savedList);
  return (
    <div id="main">
      <button type="button" className="light-or-dark" onClick={() => handleDarkMode()}>Dark Mode</button>
      <ManualOrReceipt
        current={currOption}
        handleOption={handleRadioOption}
      />
      <div style={header}> 🍓🥬🥕 Grocery List 🥕🥬🍓 </div>
      { isLoggedIn
        ? <div style={auth}>
            <div style={{paddingTop:'5px'}}>
              {username}
            </div>
            <button className="auth" type="button" onClick={handleLogoutStatus}>Log Out</button>
          </div>

        : <div style={auth}>
            <div style={{paddingTop:'5px'}}>{username}
            </div>
            <button className="auth" type="button" onClick={() => { history.push('/login')}}>Log In</button>
            <button className="auth" type="button" onClick={() => {
              history.push('/signup')
            }}>Sign Up</button>
          </div>
      }
      <Switch>
        <Route exact path="/"><Main handleList={handleList} handleRecommended={handleRecommended} /></Route>
        <Route path="/receipt"><Receipt /></Route>
        <Route
          path="/results"
          render={(props) => <Results {...props}
          user={recommNutrients} cart={listNutrients} username={username}/>}
        />
        <Route path="/login"><Login handleLoginStatus={handleLoginStatus} handleSavedList={handleSavedList}/></Route>
        <Route path="/signup"><Signup /></Route>
        <Route
          path="/:user"
          render={(props) => <User {...props} handleList={handleList} handleRecommended={handleRecommended} handleSavedList={handleSavedList} savedList={savedList} username={username}/>}
        />
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
  display: 'inline-flex',
  position: 'absolute',
  top: '40px',
  right: '100px',
}


export default App;