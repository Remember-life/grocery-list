import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

function Setting ({settingToMain}) {

  const [age, setAge] = useState('');
  const [activity, setActivity] = useState('');

  const handleBackToList = e => {
    e.preventDefault();
  }

  const handleAgeChange = (event) => {
    // const value = event.target.value;
    setAge(event.target.value);
  }

  const handleActivityChange = (event) => {
    // const value = event.target.value;
    setActivity(event.target.value);
  }

  const handleSettingSubmit = e => {
    e.preventDefault();
    // console.log('SETTING submit', age, activity);
    settingToMain(age, activity);
  }

  return (
    <div>
      SETTING:
      <form onSubmit={handleSettingSubmit}>
        <label>
          Your age in years:
          <input type="text" value={age} onChange={event => handleAgeChange(event)} />
        </label>
        <label>
          Physical Activity level:
          <input type="text" value={activity} onChange={event => handleActivityChange(event)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <button type="button" onClick={handleBackToList}>
        <Link to="/">Close</Link>
      </button>
    </div>
  )
}


export default Setting;