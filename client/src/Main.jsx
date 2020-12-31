import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

function Main () {

  const [inputFields, setInputFields] = useState([
    { item: '', quantity: '' },
    { item: '', quantity: '' },
    { item: '', quantity: '' }
  ]);

  const handleSubmit = e => {
    e.preventDefault();
    console.log('inputFields', inputFields);
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
        </div>
        <div>
          <button type="button" onClick={() => handleAddFields()}>+</button>
          <button type="button" onClick={handleClear}>Clear</button>
          <button type="submit" onSubmit={handleSubmit}>Submit</button>
        </div>
      </form>
    </>
  )

}

const container = {
  display: 'flex',
  flexFlow: "column wrap",
}

const input = {
  width: "50%",
}


export default Main;

