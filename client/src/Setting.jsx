import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

function Setting ({settingToMain}) {

  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [activity, setActivity] = useState('');
  const [days, setDays] = useState('');

  const handleBackToList = e => {
    e.preventDefault();
  }

  const handleAgeChange = e => {
    setAge(e.target.value);
  }

  const handleGenderChange = e => {
    setGender(e.target.value);
  }

  const handleActivityChange = e => {
    setActivity(e.target.value);
  }

  const handleDaysChange = e => {
    setDays(e.target.value);
  }

  const handleSettingSubmit = e => {
    e.preventDefault();
    // console.log('SETTING submit', age, gender, activity);
    settingToMain(age, gender, activity, days);
  }

  return (
    <div>
      SETTING:
      <form onSubmit={handleSettingSubmit}>
        <label>
          Age in years:
          <input type="text" value={age} onChange={event => handleAgeChange(event)} />
        </label>
        <label>
          Gender:
          <select type="text" value={gender} onChange={event => handleGenderChange(event)}>
            <option value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          Physical Activity level:
          <select type="text" value={activity} onChange={event => handleActivityChange(event)}>
            <option value=""></option>
            <option value="sedentary">Sedentary</option>
            <option value="moderate">Moderately active</option>
            <option value="active">Active</option>
          </select>
        </label>
        <label>
          For how many days?
          <input type="text" value={days} onChange={event => handleDaysChange(event)} />
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