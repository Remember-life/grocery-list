import React, { useState } from 'react';
import { useHistory, BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Backdrop from './Backdrop.jsx';

function Login ({ handleLoginStatus, handleSavedList }) {
  const history = useHistory();

  const [backdrop, setBackDrop] = useState(true);

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  }

  const handleLoginSubmit = e => {
    e.preventDefault;

    axios.get('/login', {
      params: {
        username: username,
        password: password,
      }
    })
    .then(function (response) {
      console.log('User is logged in');
      handleLoginStatus(username);
      if (response.data.saved_list) {
        handleSavedList(response.data.saved_list);
      }
      // history.push({
      //   pathname: `/${username}`,
      //   data: response.data
      // })
    })
    .then(function () {
      history.push(`/${username}`);
    })
    .catch(function (error) {
      console.log('Error in logging in the user - ', error);
      if (error.response.status === 404) {
        window.alert('No user found. Check your login info and try again.');
      } else if (error.response.status === 500) {
        window.alert('Internal server error. Try logging in later.')
      }
    })
  }

  return (
    <>
      <div>
        {backdrop ? <Backdrop /> : null}
      </div>
      <div className="Modal">
        <b>Login</b>
        <hr />
        <form style={form}>
          <label>username:</label>
          <input
            type="text"
            value={username}
            onChange={e => handleUsernameChange(e)}
            style={input}
          />
          <label>password:</label>
          <input
            type="text"
            value={password}
            onChange={e => handlePasswordChange(e)}
            style={input}
          />
        </form>
        <button
          type="button"
          onClick={handleLoginSubmit}
          style={loginButtons}
        >
          {/* <Link to={`/${username}`}>Log in</Link> */}
          Log in
        </button>
        <button
          type="button"
          onClick={() => { history.push('/') }}
          style={loginButtons}
        >
          Back to list
        </button>
      </div>
    </>

  )

}

const form = {
  display: 'flex',
  flexFlow: 'column wrap',
}

const input = {
  border: '1px solid black',
  padding: '5px',
  marginBottom: '10px',
}

const loginButtons = {
  padding: '10px',
  marginRight: '20px',
}

export default Login;