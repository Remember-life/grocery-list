import React, { useState } from 'react';
import '../../style.css';
import axios from 'axios';

function SendEmail ({items}) {

  const [emailAddress, setEmailAddress] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();

    axios.post('/email', {
      address: emailAddress,
      items: items,
    })
    .then(function (response) {
      console.log('SUCCESS in sending email');
    })
    .catch(function (error) {
      console.log('ERROR in sending email - ', email);
    })
  }

  const handleInputChange = (e) => {
    setEmailAddress(e.target.value);
  }

  return (
    <div style={emailContainer}>
      <form onSubmit={handleEmailSubmit}>
        <input
          className="email-form"
          type="text"
          placeholder="Type email address..."
          onChange={event => handleInputChange(event)}
        />
      </form>
      <button className="email-button" type="button" onClick={handleEmailSubmit}>Send</button>
    </div>
  )

}

const emailContainer = {
  display: 'inline-flex',
}




export default SendEmail;