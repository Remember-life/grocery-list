import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Results from './Results.jsx';
import Setting from './Setting.jsx';
import axios from 'axios';

function Main () {

  const [inputFields, setInputFields] = useState([
    { item: '', quantity: '' },
    { item: '', quantity: '' },
    { item: '', quantity: '' }
  ]);

  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [activity, setActivity] = useState('');

  const [user, setUser] = useState([
    { data: 'not available' },
  ]);

  //once submitted, two get requests
  // in success cb, change state to the response data
  // pass down the state to results
  const handleSubmit = e => {
    e.preventDefault();
    console.log('inputFields', inputFields);

    // get request with setting info to local database
      // state to store the response data
        // pass down the state to results page
    axios.get('/user', {
      params: {
        age: age,
        gender: gender,
        activity: activity
      }
    })
    .then(function(response) {
      console.log('main RESPONSE', response.data);
      setUser(response.data);
    })
    .catch(function(error) {
      console.log('main ERROR', error);
    })


    // get request with inputfields values into external database
      // state to store the response data
        // pass down the state  to results page
  }

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "itemName") {
      values[index].item = event.target.value;
    } else {
      values[index].quantity = event.target.value;
    }

    setInputFields(values);
  }

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ item: '', quantity: '' });
    setInputFields(values);
  }

  const handleRemoveFields = index => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  }

  const handleClear = (e) => {
    Array.from(document.querySelectorAll('input')).forEach(
      input => (input.value = '')
    );
    setInputFields([
      { item: '', quantity: '' },
      { item: '', quantity: '' },
      { item: '', quantity: '' }
    ])
  }

  // from submit in setting
  const handleSettingSubmit = (age, gender, activity) => {
    // change state
    // console.log('main BEFORE', age, gender, activity)
    setAge(age);
    setGender(gender);
    setActivity(activity);
    // console.log('main AFTER', age, gender, activity);
  }

  const canRemove = inputFields.length > 1;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container" style={container}>
          {inputFields.map((inputField, index) => (
            <React.Fragment key={`${inputField}~${index}`}>
              <div>
                <label>Item: </label>
                <input
                  type="text"
                  id="itemName"
                  name="itemName"
                  value={inputField.item}
                  onChange={event => handleInputChange(index, event)}
                />
              </div>
              <div>
                <label>How many? </label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  value={inputField.quantity}
                  onChange={event => handleInputChange(index, event)}
                />
              </div>
              <div>
                {canRemove
                  ? <button type="button" onClick={() => handleRemoveFields(index)}>
                    - </button>
                  : null
                }
              </div>
            </React.Fragment>
          ))}
        <button type="button" onClick={() => handleAddFields()}>+</button>
        <button type="button">
          <Link to="/setting">Setting</Link>
        </button>
        <button type="button" onClick={handleClear}>Clear</button>
        <button type="button" onClick={handleSubmit}>
          <Link to="/results">Submit</Link>
        </button>
        </div>
      </form>
      <div className="setting-container">
        <Route path="/setting"><Setting settingToMain={handleSettingSubmit}/></Route>
      </div>
      <div className="results-container" style={resultsContainer}>
        <Route path="/results"><Results user={user}/></Route>
      </div>
    </>
  )

}

const container = {
  display: "inline-block",
}

// const formContainer = {
//   display: 'flex',
//   flexFlow: "column wrap",
// }

const resultsContainer = {
  display: "inline-block",
}


export default Main;

