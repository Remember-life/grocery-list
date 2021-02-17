import React, { useState } from 'react';
import { useHistory, BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MacroChart from './MacroChart.jsx';
import NonMacroChart from './NonMacroChart.jsx';
import '../../style.css';

function Results ({ user, cart }) {

  const history = useHistory();

  const handleBackToList = e => {
    e.preventDefault();
  }

  const backToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }


  const myButton = document.getElementById('top');
  window.onscroll = function () {scrollFunction(myButton)};

  const scrollFunction = (el) => {
    if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  }

  const needMore = [];
  const needLess = [];
  const withinRange = []; // +/- 10%

  const increaseCalorie = (cart.calorie < user.calorie) && (Math.abs(cart.calorie - user.calorie) > (user.calorie * 0.1));
  const decreaseCalorie = (cart.calorie > user.calorie) && (Math.abs(cart.calorie - user.calorie) > (user.calorie * 0.1));

  const macro = ['carb', 'protein', 'fat']
  const limits = [['upper_carb', 'lower_carb'], ['upper_protein', 'lower_protein'], ['upper_fat', 'lower_fat']];
  for (var i = 0; i < macro.length; i++) {
    var group = macro[i];
    var upper = limits[i][0];
    var lower = limits[i][1];

    // if cart[name] is greater than lower_name * 0.9  && less than upper_name * 1.10
      // push name to withinRange
    if ( user[lower] * 0.9 <= cart[group] && cart[group] <= user[upper] * 1.1 ) {
      withinRange.push(group)
    } else if ( cart[group] < user[lower]) {
      needMore.push(group);
    } else if (cart[group] > user[upper]) {
      needLess.push(group);
    }

  }

  const nonMacro = ['calcium', 'fiber', 'iron', 'magnesium', 'potassium', 'sodium', 'vitamin_a', 'vitamin_b6', 'vitamin_b12', 'vitamin_c', 'vitamin_d' ];
  for (var i = 0; i < nonMacro.length; i++) {
    var nutrient = nonMacro[i];
    if (cart[nutrient] > user[nutrient]) {
      needLess.push(nutrient);
    }
    if (cart[nutrient] < user[nutrient]) {
      needMore.push(nutrient);
    }
  }

  const listWithin = withinRange.map((nutrient, index) => {
    <li key={index}>{nutrient}</li>
  })
  const listMore = needMore.map((nutrient, index) =>
    <li key={index}>{nutrient}</li>
  );
  const listLess = needLess.map((nutrient, index) =>
    <li key={index}>{nutrient}</li>
  );



  return (
    <div className="result-container" style={resultContainer}>
      <div style={{fontWeight: 'bold', fontSize:'130%'}}>Here is your data:</div>
      <MacroChart user={user} cart={cart}/>
      <NonMacroChart user={user} cart={cart}/>
      <div style={range}>
        <div style={calorie}>
          Daily calorie limit:{user.calorie}
        </div>
        <div style={calorie}>
          Calorie calculated from list: {cart.calorie}
        </div>
      </div>
      <div style={recomm}>
        <em>{decreaseCalorie ? 'Consider getting rid of items high in sugar or fat!' : increaseCalorie ? 'Consider adding more items to your list!' : 'Your daily calorie is within the range!'}</em>
      </div>
      <div style={{paddingBottom: '15px'}}>
        🍉 🧀 🥓 🍦 🧃 🍎 🌽 🥦 🍋 🍇 🥪 🥭 🧄 🥗 🍞 🥨 🍉 🧀 🥓 🍦 🧃 🍎 🌽 🥦 🍋 🍇 🥪 🥭 🧄 🥗 🍞 🥚 🌰 🥕 🥒 🍣 🍪 🍢 🍤
      </div>
      <div style={threeColumns}>
        <div style={level}>
          Within range!
          <ul>{withinRange.length === 0 ? 'None!' : listWithin}</ul>
        </div>
        <div style={level}>
          You need more of:
          <ul>{needMore.length === 0 ? 'None!' : listMore}</ul>
        </div>
        <div style={level}>
          You need less of:
          <ul>{needLess.length === 0 ? 'None!' : listLess}</ul>
        </div>
      </div>
      <button id="top" type="button" onClick={backToTop} style={top}>Top</button>
      <button id="back" className="back-to-list" type="button"
        onClick={() => history.push('/')}
      >Back to List</button>
    </div>
  )
}

const resultContainer = {

  paddingTop: '80px',
  paddingLeft: '250px',


}

const close = {
  border: 'none',
  padding: '10px',
  backgroundColor: 'red',
  float: 'right',
}

const calorie = {
  display: 'inline',
  height: 'fit-content',
  width: '300px',
}

const recomm = {
  paddingLeft: '220px',
  paddingTop: '15px',
  paddingBottom: '15px',
  width: '60%',
  backgroundColor: 'rgb(241, 200, 109)',
}

const range = {
  display: 'inline-flex',
  justifyContent: 'space-around',
  paddingLeft: '200px',
}

const threeColumns = {
  display: 'inline-flex',
  justifyContent: 'space-around',
  paddingLeft: '130px',
}

const level = {
  display: 'inline',
  height: 'fit-content',
  width: '250px',
}

const top = {
  display: 'none',
  position: 'fixed',
  bottom: '50px',
  right: '150px',
  border: 'none',
  backgroundColor: 'red',
  color: 'white',
  cursor: 'pointer',
  padding: '10px',
  borderRadius: '5px',
}

export default Results;