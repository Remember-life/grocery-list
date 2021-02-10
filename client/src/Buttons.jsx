import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../../style.css';

function Buttons ({handleSubmit}) {

  return (
    <div className="buttons" style={buttonsContainer}>
      <button type="button" className="setting-button" >
        <Link to="/setting" className="setting-text">Enter your info</Link>
      </button>
      <button type="button" className="submit-button" onClick={handleSubmit} >
        <Link to="/results" className="submit-text">Submit</Link>
      </button>
    </div>
  )

}

const buttonsContainer = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  marginTop: '10px',
}

export default Buttons;