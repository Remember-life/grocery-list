import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Chart from './Chart.jsx';

function Results ({ user, cart }) {

  const handleBackToList = e => {
    e.preventDefault();
  }

  const increaseCalorie = (cart.calorie < user.calorie) && (Math.abs(cart.calorie - user.calorie) > (user.calorie * 0.1));
  const decreaseCalorie = (cart.calorie > user.calorie) && (Math.abs(cart.calorie - user.calorie) > (user.calorie * 0.1));
  const decreaseCarb = cart.carb > user.upper_carb;
  const increaseCarb = cart.carb < user.lower_carb;
  const decreaseProtein = cart.protein > user.upper_protein;
  const increaseProtein = cart.protein < user.lower_protein;
  const decreaseFat = cart.fat > user.upper_fat;
  const increaseFat = cart.fat < user.lower_fat;

  const needMore = [];
  const needLess = [];

  if (decreaseCarb) { needLess.push('carbohydrate') }
  if (increaseCarb) { needMore.push('carbohydrate') }
  if (decreaseProtein) { needLess.push('protein') }
  if (increaseProtein) { needMore.push('protein') }
  if (decreaseFat) { needLess.push('fat') }
  if (increaseFat) { needMore.push('fat') }


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

  const listMore = needMore.map((nutrient, index) =>
    <li key={index}>{nutrient}</li>
  );

  const listLess = needLess.map((nutrient, index) =>
    <li key={index}>{nutrient}</li>
  );

  // const macro = ['carb', 'protein', 'fat'];
  // for (var i = 0; i < macro.length; i++) {
  //   console.log('for loop ', user.upper_macro[i]);
  //   // if (cart[macro[i]] > user.upper_macro[i]) {
  //   //   needLess.push(macro[i])
  //   // }
  //   // if (cart[macro[i]] < user.lower_macro[i]) {
  //   //   needMore.push(macro[i])
  //   // }
  // }

  return (
    <div className="result-container">
      <b>Here is your data:</b>
      {/* {console.log('userProfile', user)} */}
      {/* {console.log('cart', cart)} */}
      <button type="button" onClick={handleBackToList} style={close}>
        <Link to="/" style={closeButton}>x</Link>
      </button>
      <Chart user={user} cart={cart}/>
      <div>
        Daily calorie limit: {user.calorie}
      </div>
      <div>
        Calorie calculated from list: {cart.calorie}
      </div>
      <div>
        <em>{decreaseCalorie ? 'Consider getting rid of items high in sugar or fat!' : increaseCalorie ? 'Consider adding more items to your list!' : 'Your daily calorie is within the range!'}</em>
      </div>
      <hr />
      <div>
        You need more of:
        <ul>{needMore.length === 0 ? 'None!' : listMore}</ul>
      </div>
      <div>
        You need less of:
        <ul>{needLess.length === 0 ? 'None!' : listLess}</ul>
      </div>
    </div>
  )
}

const close = {
  border: 'none',
  padding: '3px',
  backgroundColor: 'red',
  float: 'right',
}

const closeButton = {
  color: 'white',
}


export default Results;