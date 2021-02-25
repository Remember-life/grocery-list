import React, { useState, useEffect } from 'react';
import { useHistory, BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Results from './Results.jsx';
import Setting from './Setting.jsx';
import SendEmail from './SendEmail.jsx';
import axios from 'axios';

function ManualOrReceipt ({ current, handleOption }) {

  const history = useHistory();

  const handleOptionChange = (e) => {
    handleOption(e.target.value);

    if (e.target.value === 'manual') {
      history.push('/')
    } else {
      history.push('/receipt')
    }
  }

  return (
    <div className="radios" style={radios}>
      <form>
        <input
          type="radio"
          value="manual"
          checked={current === 'manual'}
          onChange={e => handleOptionChange(e)}
        />
        <label>Manual</label>
        <input
          type="radio"
          value="receipt"
          checked={current === 'receipt'}
          onChange={e => handleOptionChange(e)}
        />
        <label>Receipt</label>

      </form>
    </div>
  )
}

const radios = {
  position: 'absolute',
  top: '45px',
  left: '160px',
}

export default ManualOrReceipt;