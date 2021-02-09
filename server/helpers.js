const mongo = require('mongodb');
const mongoose = require('mongoose');
const { Item, Female, Male } = require('../database/index.js');
const nodemailer = require('nodemailer');
const {user, pass} = require('../email.config.js');

function findUser (req, res) {

  const age = req.query.age;
  const gender = req.query.gender;
  const activity = req.query.activity;

  if (gender === 'female') {
    return new Promise((resolve, reject) => {
      Female.find({ age: age, activity: activity}, '-_id calcium calorie fiber iron lower_carb lower_fat lower_protein magnesium potassium sodium upper_fat upper_protein upper_carb vitamin_a vitamin_b6 vitamin_b12 vitamin_c vitamin_d', function (err, result) {
        if (err) return reject(err);
        result = result[0];
        res.send(result);
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      Male.find({ age: age, activity: activity}, '-_id calcium calorie fiber iron lower_carb lower_fat lower_protein magnesium potassium sodium upper_fat upper_protein upper_carb vitamin_a vitamin_b6 vitamin_b12 vitamin_c vitamin_d', function (err, result) {
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
  // console.log('TOTAL data', data[1]);
  // console.log('TOTAL quantity', quantity);

  var output = {};
  var keys = Object.keys(data[1].toObject()).slice(3);
  // console.log('KEYS', keys);

  var value = 0;
  for (var i = 0; i < keys.length; i++) {
    var nutrient = keys[i];
     for (var j = 0; j < data.length; j++) {
      if (quantity[j] === 1) {
        value += data[j][nutrient];
      } else {
        value += data[j][nutrient] * quantity[j];
      }
    }
    output[nutrient] = value/days;
    value = 0;
  }

  return output;
}

function sendEmail (req, res) {

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: pass
    }
  });

  var mailOptions = {
    from: user,
    to: req.body.address, //string
    subject: 'Your grocery list is here!',
    text: JSON.stringify(req.body.items) //string
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log('NodeMailer Error - ' + error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })

}

module.exports = {
  findUser,
  findItems,
  sendEmail,
}