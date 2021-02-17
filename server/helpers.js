const axios = require('axios');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const { Item, Female, Male } = require('../database/index.js');
const nodemailer = require('nodemailer');
const {user, pass, app_id, app_key} = require('../auth.config.js');

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


async function requestEdamam(input) {

  const parser = await axios.get('https://api.edamam.com/api/food-database/v2/parser', {
    params: {
      ingr: input.item,
      app_id: app_id,
      app_key: app_key
    }
  });

  var json = {
    "ingredients": [
        {
            "quantity": Number(input.quantity),
            "measureURI" : "http://www.edamam.com/ontologies/edamam.owl#Measure_unit",
            "foodId": parser.data.parsed[0].food.foodId
        }
    ]
  };

  const nutrients = await axios.post(
    'https://api.edamam.com/api/food-database/v2/nutrients?app_id=9e938d8c&app_key=511a3b25e3893606edde9ff3c0cce2fa',
    json, {
      headers: {
        "Content-Type": "application/json",
      }
  });

  return nutrients.data.totalNutrients;
}

async function getData (req, res) {
  const data = {calcium: 0, calorie: 0, carb: 0, fat: 0, fiber: 0, iron: 0, magnesium: 0, potassium: 0, protein: 0, sodium: 0, vitamin_a: 0, vitamin_b6: 0, vitamin_b12: 0, vitamin_c: 0, vitamin_d: 0};

  var names = ['calcium', 'calorie', 'carb', 'fat', 'fiber', 'iron', 'magnesium', 'potassium', 'protein', 'sodium', 'vitamin_a', 'vitamin_b6', 'vitamin_b12', 'vitamin_c', 'vitamin_d'];
  var edamamNames = ['CA', 'ENERC_KCAL', 'CHOCDF', 'FAT', 'FIBTG', 'FE', 'MG', 'K', 'PROCNT',
  'NA', 'VITA_RAE', 'VITB6A', 'VITB12', 'VITC', 'VITD'];

  var inputFields = req.query.inputFields;

  for (const input of inputFields) {
    var obj = JSON.parse(input);

    if (obj.item !== '') {
      const edamamData = await requestEdamam(obj);
      for (var i = 0; i < names.length; i++) {
        data[names[i]] += edamamData[edamamNames[i]].quantity;
      }
    }
  }

  res.send(data);
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
  getData,
  sendEmail,
}