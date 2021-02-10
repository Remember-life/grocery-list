import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Results from './Results.jsx';
import Setting from './Setting.jsx';
import SendEmail from './SendEmail.jsx';
import Buttons from './Buttons.jsx';
import '../../style.css';
import axios from 'axios';

function Main () {

  const [inputFields, setInputFields] = useState([
    { item: '', quantity: '' },
    { item: '', quantity: '' },
    { item: '', quantity: '' }
  ]);

  const [days, setDays] = useState('');
  const [user, setUser] = useState('');
  const [inputTotal, setInputTotal] = useState('');

  const data = {calcium: 0, calorie: 0, carb: 0, fat: 0, fiber: 0, iron: 0, magnesium: 0,
  potassium: 0, protein: 0, sodium: 0, vitamin_a: 0, vitamin_b6: 0, vitamin_b12: 0,
  vitamin_c: 0, vitamin_d: 0};

  async function completeLoop(input) {
    console.log('1');

    const parser = await axios.get('https://api.edamam.com/api/food-database/v2/parser', {
      params: {
        ingr: input.item,
        app_id: '9e938d8c',
        app_key: '511a3b25e3893606edde9ff3c0cce2fa'
      }
    });
    // return response.data.parsed[0].food.foodId;
    console.log('2');
    var json = {
      "ingredients": [
          {
              "quantity": Number(input.quantity),
              "measureURI" : "http://www.edamam.com/ontologies/edamam.owl#Measure_unit",
              "foodId": parser.data.parsed[0].food.foodId
          }
      ]
    };
    console.log('3');
    const nutrients = await axios.post(
      'https://api.edamam.com/api/food-database/v2/nutrients?app_id=9e938d8c&app_key=511a3b25e3893606edde9ff3c0cce2fa',
      json, {
        headers: {
          "Content-Type": "application/json",
        }
    });

    console.log('4');
    var edamamData = nutrients.data.totalNutrients;

    // var names = Object.keys(data);
    // var edamamNames = ['CA', 'ENERC_KCAL', 'CHOCDF', 'FAT', 'FIBTG', 'FE', 'MG', 'K', 'PROCNT',
    // 'NA', 'VITA_RAE', 'VITB6A', 'VITB12', 'VITC', 'VICD'];
    // for (var i = 0; i < names.length; i++) {
    //   data.names[i] += edamamData.edamamNames[i].quantity;
    // }

    data.calcium += edamamData.CA.quantity;
    data.calorie += edamamData.ENERC_KCAL.quantity;
    data.carb += edamamData.CHOCDF.quantity;
    data.fat += edamamData.FAT.quantity;
    data.fiber += edamamData.FIBTG.quantity;
    data.iron += edamamData.FE.quantity;
    data.magnesium += edamamData.MG.quantity;
    data.potassium += edamamData.K.quantity;
    data.protein += edamamData.PROCNT.quantity;
    data.sodium += edamamData.NA.quantity;
    data.vitamin_a += edamamData.VITA_RAE.quantity;
    data.vitamin_b6 += edamamData.VITB6A.quantity;
    data.vitamin_b12 += edamamData.VITB12.quantity;
    data.vitamin_c += edamamData.VITC.quantity;
    data.vitamin_d += edamamData.VITD.quantity;
    console.log('5');

    return data;

  }

  async function getData() {
    // const data = {calcium: 0, calorie: 0, carb: 0, fat: 0, fiber: 0, iron: 0, magnesium: 0, potassium: 0, protein: 0, sodium: 0, vitamin_a: 0, vitamin_b6: 0, vitamin_b12: 0, vitamin_c: 0, vitamin_d: 0};
    console.log('start');
    for (const input of inputFields) {
      const response = await completeLoop(input);
      console.log(response);
    }
    console.log('6: loop complete??', data);
    setInputTotal(data);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    getData();


    // axios.get('/items', {
    //   params: {
    //     input: inputFields,
    //     days: days,
    //   }
    // })
    // .then(function (cart) {
    //   setInputTotal(cart.data);
    // })
    // .catch(function(error) {
    //   console.log('ERROR - ', error);
    // })
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

    setDays(days);

    axios.get('/user', {
      params: {
        age: age,
        gender: gender,
        activity: activity,
      }
    })
    .then(function (user) {
      setUser(user.data);
    })
    .catch(function (error) {
      console.log('ERROR - ', error);ß
    })
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
        <Buttons handleSubmit={handleSubmit}/>
      </form>
      <SendEmail items={inputFields}/>
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
  width: '70%',
  marginLeft: "260px",
  marginTop: '30px',
  paddingBottom: '30px',
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


export default Main;

