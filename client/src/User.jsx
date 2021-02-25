import React, { useState, useEffect } from 'react';
import { useHistory, BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Setting from './Setting.jsx';
import SendEmail from './SendEmail.jsx';
import Buttons from './Buttons.jsx';


function User ({ handleList, handleRecommended,  handleSavedList, savedList, username }) {

  const history = useHistory();

  const [inputFields, setInputFields] = useState([
    { item: '', quantity: '' },
    { item: '', quantity: '' },
    { item: '', quantity: '' }
  ]);

  useEffect(() => {

    // pass up savedList to App and set it to savedList
    // every time User.jsx re-renders, savedList gets passed down
    console.log('useEffect');
    setInputFields(savedList); //for some reason, this syncs savedList and inputFields in that User is rendered with changes in savedList whenever inputfield is changed

  }, [])

  const [days, setDays] = useState('');

  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = (e) => {
    console.log('USER handlesubmit');
    e.preventDefault();
    // handleSavedList(inputFields);
    handleSavedList(savedList);
    // data from edamam
    axios.get('/edamam', {
      params: {
        inputFields: inputFields,
      }
    })
    .then(function (response) {
      handleList(response.data);
    })
    .catch(function (error) {
      console.log('Error in getting data from Edamam - ', error);
    })

    // save or update the list in db
    axios.put('/save', {
      inputFields: inputFields,
      username: username
    })
    .then(function (response) {
      console.log('List is saved/updated');

    })
    .catch(function (error) {
      console.log('Error in saving the list - ', error.response);
    })

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
    setInputFields([
      { item: '', quantity: '' },
      { item: '', quantity: '' },
      { item: '', quantity: '' }
    ])
  }

  // from submit in setting
  const handleSettingSubmit = (age, gender, activity, days) => {

    setDays(days);
    setOpenModal(false);

    axios.get('/user', {
      params: {
        age: age,
        gender: gender,
        activity: activity,
      }
    })
    .then(function (user) {
      // setUser(user.data);
      handleRecommended(user.data);
    })
    .catch(function (error) {
      console.log('ERROR - ', error);
    })

  }

  const openSettingModal = () => {
    setOpenModal(true);
  }

  const canRemove = inputFields.length > 1;


  return (
    <>
      <form onSubmit={handleSubmit} style={form}>
          {inputFields.map((inputField, index) => (
            <React.Fragment key={`${inputField}~${index}`}>
              <div className="input-fields" style={fragment}>
                <div className="item-name">
                  <label>Item </label>
                  <input
                    type="text"
                    id="itemName"
                    name="itemName"
                    value={inputField.item}
                    size="7"
                    onChange={event => handleInputChange(index, event)}
                  />
                </div>
                <div className="item-amount" style={{marginLeft: '10px'}}>
                  <label>Amount </label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    value={inputField.quantity}
                    size="2"
                    onChange={event => handleInputChange(index, event)}
                  />
                </div>
                <div className="delete-item" style={{marginLeft: '10px'}}>
                  {canRemove
                    ? <button type="button" className="trash-can" onClick={() => handleRemoveFields(index)}>
                      🗑 </button>
                    : null
                  }
                </div>
              </div>
            </React.Fragment>
          ))}
        <div className="buttons" style={buttonsContainer}>
          <button type="button" className="add-more-button" onClick={() => handleAddFields()}>+</button>
          <button type="button" className="clear-button" onClick={handleClear} >Clear</button>
        </div>
        <Buttons handleSubmit={handleSubmit} openSettingModal={openSettingModal} from={username}/>
      </form>
      <SendEmail items={inputFields}/>
      { openModal
        ? <Setting settingToMain={handleSettingSubmit} from={username}/>
        : null
      }
    </>
  )
}

const form = {
  fontFamily: 'Comic Sans MS',
  display: 'inline-block',
  marginLeft: '400px',
  paddingTop: '110px',
  paddingBottom: "100px",
}

const fragment = {
  display: 'flex',
  flexDirection: 'row',
  marginBottom: '10px',
  fontSize: '13px',
}

const buttonsContainer = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  marginTop: '10px',
}


export default User;