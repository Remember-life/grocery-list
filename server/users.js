const mongo = require('mongodb');
const mongoose = require('mongoose');
const { Female, Male } = require('../database/index.js');

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
        res.send(result);
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      Male.find({ age: age, activity: activity}, function (err, result) {
        if (err) return reject(err);
        res.send(result);
      })
    })
  }

}



module.exports = {
  findUser,
}