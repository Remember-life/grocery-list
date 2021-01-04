import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import  '../../style.css';
import Backdrop from './Backdrop.jsx';

function Setting ({settingToMain}) {

  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [activity, setActivity] = useState('');
  const [days, setDays] = useState('');
  const [backdrop, setBackdrop] = useState(true);

  const handleBackToList = e => {
    e.preventDefault();
    setBackdrop(false);
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
    <>
      <div>
        {backdrop ? <Backdrop /> : null}
      </div>
      <div className="Modal">
        <b>SETTING:</b>
        <button type="button" onClick={handleBackToList} style={close}>
          <Link to="/">x</Link>
        </button>
        <hr />
        <form onSubmit={handleSettingSubmit} style={form}>
          <label>
            Age in years:
            <input type="text" value={age} size="3" onChange={event => handleAgeChange(event)} />
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
            <input type="text" value={days} size="3" onChange={event => handleDaysChange(event)} />
          </label>
          <input type="submit" value="save" style={save}/>
        </form>
      </div>
    </>
  )
}

const form = {
  display: 'flex',
  flexFlow: "column wrap",
}

const save = {
  width: '10%',
  border: 'none',
  padding: '3px',
  cursor: 'pointer',
  backgroundColor: 'rgba(59, 208, 32, 1)',

}

const close = {
  border: 'none',
  padding: '3px',
  backgroundColor: 'red',
  float: 'right',
}

export default Setting;