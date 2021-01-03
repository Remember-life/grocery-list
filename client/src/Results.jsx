import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

function Results () {

  const handleBackToList = e => {
    e.preventDefault();
  }

  return (
    <div>
      THIS IS THE RESULTS PAGE!
      <button type="button" onClick={handleBackToList}>
        <Link to="/">Close</Link>
      </button>
    </div>
  )
}


export default Results;