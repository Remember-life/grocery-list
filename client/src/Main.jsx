import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Results from './Results.jsx';
import Setting from './Setting.jsx';
import '../../style.css';
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
  const [days, setDays] = useState('');

  const [user, setUser] = useState('');
  const [inputTotal, setInputTotal] = useState('');

  //once submitted, two get requests
  // in success cb, change state to the response data
  // pass down the state to results
  const handleSubmit = e => {
    e.preventDefault();
    console.log('inputFields', inputFields);

    // get request with setting info to local database
      // state to store the response data
        // pass down the state to results page
    axios.all([
      axios.get('/user', {
        params: {
          age: age,
          gender: gender,
          activity: activity,
        }
      }),
      axios.get('/items', {
        params: {
          input: inputFields,
          days: days,
        }
      })
    ])
    .then(axios.spread((user, cart) => {
      // console.log('main RESPONSE', user.data);
      setUser(user.data);

      // console.log('main Cart response:', cart.data);
      setInputTotal(cart.data);
    }))
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
    // Array.from(document.querySelectorAll('input')).forEach(
    //   input => (input.value = '')
    // );
    setInputFields([
      { item: '', quantity: '' },
      { item: '', quantity: '' },
      { item: '', quantity: '' }
    ])
  }

  // from submit in setting
  const handleSettingSubmit = (age, gender, activity, days) => {
    // change state
    // console.log('main BEFORE', age, gender, activity)
    setAge(age);
    setGender(gender);
    setActivity(activity);
    setDays(days);
    // console.log('main AFTER', age, gender, activity);
  }

  const canRemove = inputFields.length > 1;

  return (
    <>
      <form onSubmit={handleSubmit} style={form}>
          {inputFields.map((inputField, index) => (
            <React.Fragment key={`${inputField}~${index}`}>
              <div className="input-fields" style={fragment}>
                <div className="item-name">
                  <label>Item:</label>
                  <input
                    type="text"
                    id="itemName"
                    name="itemName"
                    value={inputField.item}
                    size="7"
                    onChange={event => handleInputChange(index, event)}
                  />
                </div>
                <div className="item-amount" style={amount}>
                  <label>How many?</label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    value={inputField.quantity}
                    size="2"
                    onChange={event => handleInputChange(index, event)}
                  />
                </div>
                <div className="delete-item" style={remove}>
                  {canRemove
                    ? <button type="button" onClick={() => handleRemoveFields(index)} style={removeButton}>
                      delete </button>
                    : null
                  }
                </div>
              </div>
            </React.Fragment>
          ))}
        <button type="button" onClick={() => handleAddFields()} style={addMore}>Add more!</button>
        <div className="buttons" style={buttonsContainer}>
          <button type="button" style={button}>
            <Link to="/setting">Setting</Link>
          </button>
          <button type="button" onClick={handleClear} style={button}>Clear</button>
          <button type="button" onClick={handleSubmit} style={button}>
            <Link to="/results">Submit</Link>
          </button>
        </div>
      </form>
      <div className="results-container" style={resultsContainer}>
        <Route path="/results"><Results user={user} cart={inputTotal}/></Route>
      </div>
      <div className="setting-container">
        <Route path="/setting"><Setting settingToMain={handleSettingSubmit}/></Route>
      </div>
    </>
  )

}

const form = {
  fontFamily: 'Comic Sans MS',
  display: 'inline-block',
  marginLeft: "50px",
  paddingTop: "70px",
}

const resultsContainer = {
  // display: 'inline-block',
  width: '50%',
  marginLeft: "260px",
  marginTop: '30px',
  paddingBottom: '30px',
}

const fragment = {
  display: 'flex',
  flexDirection: 'row',
  marginBottom: '10px',
}

const amount = {
  marginLeft: '10px',
}

const remove = {
  marginLeft: '10px',
}

const removeButton = {
  border: 'none',
  padding: '4px',
}

const addMore = {
  width: '80%',
  border: 'none',
  padding: '3px',
  borderRadius: '8px',
  cursor: 'pointer',
}

const buttonsContainer = {
  width: '80%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  marginTop: '10px',
}

const button = {
  border: 'none',
  padding: '4px',
  cursor: 'pointer',
}

export default Main;

