const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const { findUser } = require('./users.js');

app.use(express.static('./client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/user', findUser);

app.listen(port, () => {
  console.log('Listening on 3000')
});