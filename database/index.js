const mongo = require('mongodb');
const mongoose = require('mongoose');
const uri = 'mongodb://localhost/grocery';

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true,
useFindAndModify: false});

const db = mongoose.connection;
db.on('error', function() {
  console.log('ERROR in connection');
})
db.once('open', function() {
  console.log('SUCCESSFUL CONNECTION');
})

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  saved_list: {
    type: Array,
    default: [
      { item: '', quantity: '' },
      { item: '', quantity: '' },
      { item: '', quantity: '' }
    ]
  }
})

const femaleSchema = new mongoose.Schema({
  age: Number,
  activity: String,
  calorie: Number,
  lower_carb: Number,
  upper_carb: Number,
  lower_protein: Number,
  upper_protein: Number,
  lower_fat: Number,
  upper_fat: Number,
  sodium: Number,
  potassium: Number,
  fiber: Number,
  vitamin_a: Number,
  vitamin_c: Number,
  calcium: Number,
  iron: Number,
  vitamin_d: Number,
  vitamin_b6: Number,
  vitamin_b12: Number,
  magnesium: Number
})

const maleSchema = new mongoose.Schema({
  age: Number,
  activity: String,
  calorie: Number,
  lower_carb: Number,
  upper_carb: Number,
  lower_protein: Number,
  upper_protein: Number,
  lower_fat: Number,
  upper_fat: Number,
  sodium: Number,
  potassium: Number,
  fiber: Number,
  vitamin_a: Number,
  vitamin_c: Number,
  calcium: Number,
  iron: Number,
  vitamin_d: Number,
  vitamin_b6: Number,
  vitamin_b12: Number,
  magnesium: Number
})

const User = mongoose.model('User', userSchema);
const Female = mongoose.model('Female', femaleSchema);
const Male = mongoose.model('Male', maleSchema);

module.exports = {
  db,
  User,
  Female,
  Male
}