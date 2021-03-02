const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const port = 3000;
const { findUser, getData, sendEmail } = require('./controllers.js');
const { verifyToken, registerUser, loginUser, save, invalidateToken } = require('./authControllers.js');

app.use(express.static('./client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors());

app.get('/user', findUser);
app.get('/edamam', getData);
app.post('/email', sendEmail);
app.post('/register', registerUser);
app.get('/login', loginUser);
app.put('/save', verifyToken, save)
app.get('/logout', invalidateToken);

app.listen(port, () => {
  console.log('Listening on 3000')
});