const mongo = require('mongodb');
const mongoose = require('mongoose');
const uri = 'mongodb://localhost/grocery';

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', function() {
  console.log('ERROR in connection');
})
db.once('open', function() {
  console.log('SUCCESSFUL CONNECTION');
})

const itemSchema = new mongoose.Schema({
  name: String,
  category: String,
  calorie: Number
});

const Item = mongoose.model('Item', itemSchema);

module.exports = {
  db,
  Item
}