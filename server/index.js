const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;
const { findUser, findItems, sendEmail } = require('./helpers.js');

app.use(express.static('./client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/user', findUser);
app.get('/items', findItems);
app.post('/email', sendEmail);

app.listen(port, () => {
  console.log('Listening on 3000')
});