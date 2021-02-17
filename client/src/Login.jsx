import React, { useState } from 'react';
import { useHistory, BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import '../../style.css';
import Backdrop from './Backdrop.jsx';

function Login () {
  const history = useHistory();

  const [backdrop, setBackDrop] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  }

  const handleEmailChange = e => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  }

  const handleLoginSubmit = e => {
    e.preventDefault;

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
          <label>email address:</label>
          <input
            type="text"
            value={email}
            onChange={e => handleEmailChange(e)}
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