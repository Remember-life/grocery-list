const axios = require('axios');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const { User } = require('../database/index.js');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const bcrypt = require('bcryptjs'); // encryption for password including salt
require('dotenv').config(); //process.env.privateKey

// middleware to authenticate a token
function verifyToken(req, res, next) {
  var token = req.cookies.jwt;

  if (!token) {
    return res.status(403).send(); // 403 = Forbidden; server understood the request but refuses to authorize it
  }

  jwt.verify(token, process.env.privateKey, function(err, decoded) {
    //decoded = original payload
    if (err) {
      return res.status(401).send() //token has expired or is invalid
    }
    next();
  })
}

// generate a token
// username = {username: 'username'}
// {username: req.body.params.username}
function generateToken(username) {
  return jwt.sign(username, process.env.privateKey,  {expiresIn: '1800s'}); //30min
}

// register new user
// save a user in mongo with hashedpassword
function registerUser (req, res) {

  var hashedPassword = bcrypt.hashSync(req.body.params.password, 8);

  User.create({
    username: req.body.params.username,
    email: req.body.params.email,
    password: hashedPassword
  }, function(err, user) {
    if (err) {
      return res.status(500).send('Error in registering the user');
    }
  });

  res.status(200).send('Success in registering the user');
}

// login
async function loginUser (req, res) {

  // var user = await findLoginInfo(req.query.email);

  User.findOne({username: req.query.username}, function(err, user) {
    if (err) {
      return res.status(500).send('Internal server error');
    }
    if (!user) {
      return res.status(404).send('No user found')
    }

    var passwordIsValid = bcrypt.compareSync(req.query.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send('Invalid password')
    }

    // generate token
    var newToken = generateToken({username: user.username});
    // add token in cookie
    res.cookie('jwt', newToken, { httpOnly: true });
    // res.cookie('jwt', newToken);

    res.status(200).send(user);

  })

}

// find the user and save/update their list
function save (req, res) {

  User.findOneAndUpdate(
    {username: req.body.username},
    {$set: {saved_list: req.body.inputFields}},
    {returnNewDocument: true},
    function(err, user) {
      if (err) {
        return res.status(500).send('Internal server error');
      }
      if (!user) {
        return res.status(404).send('No user found');
      }
      res.status(200).send('Successfully saved/updated the list');
    }
  )

}

function invalidateToken (req, res) {
  res.cookie('jwt', 'logged-out', {maxAge: 0, httpOnly: true})

  res.status(200).send('Success in logging out user');
}

module.exports = {
  verifyToken,
  registerUser,
  loginUser,
  save,
  invalidateToken,
}