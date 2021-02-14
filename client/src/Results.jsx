import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MacroChart from './MacroChart.jsx';
import NonMacroChart from './NonMacroChart.jsx';

function Results ({ user, cart }) {

  const handleBackToList = e => {
    e.preventDefault();
  }

  const backToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  const mybutton = document.getElementById('top');
  window.onscroll = function () {scrollFunction()};
  const scrollFunction = () => {
    if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
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
    <div className="result-container">
      <b>Here is your data:</b>
      <button type="button" onClick={handleBackToList} style={close}>
        <Link to="/" style={{color: 'white'}}>x</Link>
      </button>
      <MacroChart user={user} cart={cart}/>
      <NonMacroChart user={user} cart={cart}/>
      <div style={range}>
        <div style={level}>
          Daily calorie limit: {user.calorie}
        </div>
        <div style={level}>
          Calorie calculated from list: {cart.calorie}
        </div>
      </div>
      <div style={recomm}>
        <em>{decreaseCalorie ? 'Consider getting rid of items high in sugar or fat!' : increaseCalorie ? 'Consider adding more items to your list!' : 'Your daily calorie is within the range!'}</em>
      </div>
      <div style={{paddingBottom: '15px'}}>
        🍉 🧀 🥓 🍦 🧃 🍎 🌽 🥦 🍋 🍇 🥪 🥭 🧄 🥗 🍞 🥨 🍉 🧀 🥓 🍦 🧃 🍎 🌽 🥦 🍋 🍇 🥪 🥭 🧄 🥗 🍞 🥚 🌰 🥕 🥒 🍣 🍪 🍢 🍤
      </div>
      {/* <hr />    instead of a horizontal bar, make a line of grocery items with unicode */}
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
      <button type="button">
        <Link to="/">Back to List</Link>
      </button>
    </div>
  )
}

const close = {
  border: 'none',
  padding: '10px',
  backgroundColor: 'red',
  float: 'right',
}

const recomm = {
  paddingLeft: '220px',
  paddingTop: '15px',
  paddingBottom: '15px',
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