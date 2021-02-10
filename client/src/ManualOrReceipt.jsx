import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Results from './Results.jsx';
import Setting from './Setting.jsx';
import SendEmail from './SendEmail.jsx';
import '../../style.css';
import axios from 'axios';

function ManualOrReceipt ({ current, handleOption }) {

  const handleOptionChange = (e) => {

    handleOption(e.target.value);
  }

  return (
    <div className="radios" style={radios}>
      <form>
        <input
          type="radio"
          value="manual"
          // name="option"
          checked={current === 'manual'}
          onChange={e => handleOptionChange(e)}
        />
        <label>Manual</label>
        <input
          type="radio"
          value="receipt"
          // name="option"
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