const mongo = require('mongodb');
const mongoose = require('mongoose');
const { Item, Female, Male } = require('../database/index.js');

function findUser (req, res) {
  // const queryStr = ``;
  // return new Promise((resolve, reject) => {
  //   connection.query(queryStr, (err, result) => {
  //     if (err) return reject(err);
  //     return resolve(result);
  //   })
  // })

  /**
   function findUser(req, res) {
     usersModel.findUser(req.params.id)
      .then((results) => res.send(results))
      .catch((err) => {
        res.status(404)
        res.send(err)
      })
   }
   */

  const age = req.query.age;
  const gender = req.query.gender;
  const activity = req.query.activity;

  if (gender === 'female') {
    return new Promise((resolve, reject) => {
      Female.find({ age: age, activity: activity}, function (err, result) {
        if (err) return reject(err);
        result = result[0];
        res.send(result);
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      Male.find({ age: age, activity: activity}, function (err, result) {
        if (err) return reject(err);
        result = result[0];
        res.send(result);
      })
    })
  }

}

async function findItems (req, res) {
  // console.log('REQ.QUERY', req.query);
  const items = req.query.input;
  const days = req.query.days;
  const nutrients = [];
  const quantity = [];

  for (var i = 0; i < items.length; i++) {
    const parsed = JSON.parse(items[i]);
    var name = parsed.item;
    var item_quantity = parsed.quantity;
    quantity.push(item_quantity);

    const result = await findData(name);
    nutrients.push(result);
  }

  // console.log('findData nutrients ', nutrients);
  // console.log('findData quantity ', quantity);

  const cart = total(nutrients, quantity, days);

  res.send(cart);
}

async function findData (name) {
  var output;
  await Item.find({ name: name }, function (err, result) {
    if (err) {
      console.log('findItems ERROR: ', err);
    } else {
      // console.log('Item.find result: ', result[0]);
      output = result[0];
    }
  })
  return output;
}

function total (data, quantity, days) {
  // console.log('TOTAL data', data);
  // console.log('TOTAL quantity', quantity);

  var output = {};
  var keys = Object.keys(data[0].toObject()).slice(3);

  var value = 0;
  for (var i = 0; i < keys.length; i++) {
    var nutrient = keys[i];
     for (var j = 0; j < data.length; j++) {
      if (quantity[j] === 1) {
        value += data[j][nutrient];
      } else {
        value += (data[j][nutrient]) * quantity[j];
      }
    }
    output[nutrient] = value/days;
    value = 0;
  }
  // console.log('total object', output);

  return output;
}


module.exports = {
  findUser,
  findItems,
}