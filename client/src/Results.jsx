import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

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


  const nonMicro = ['calcium', 'fiber', 'iron', 'magnesium', 'potassium', 'sodium', 'vitamin_a', 'vitamin_b6', 'vitamin_b12', 'vitamin_c', 'vitamin_d' ];
  for (var i = 0; i < nonMicro.length; i++) {
    var nutrient = nonMicro[i];
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
    <div>
      Here is your data:
      {console.log('userProfile', user)}
      {console.log('cart', cart)}
      <div>
        Daily calorie limit: {user.calorie}
      </div>
      <div>
        Calorie calculated from list: {cart.calorie}
      </div>
      <div>
        {decreaseCalorie ? 'Consider getting rid of items high in sugar or fat!' : increaseCalorie ? 'Consider adding more items to your list!' : 'Your daily calorie is within the range!'}
      </div>
      <div>
        You need more of:
        <ul>{needMore.length === 0 ? 'None!' : listMore}</ul>
      </div>
      <div>
        You need less of:
        <ul>{needLess.length === 0 ? 'None!' : listLess}</ul>
      </div>


      <button type="button" onClick={handleBackToList}>
        <Link to="/">Close</Link>
      </button>
    </div>
  )
}


export default Results;