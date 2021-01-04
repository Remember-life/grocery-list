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
  category: {
    type: String,
    enum: ['fruit', 'veggie', 'grain', 'protein', 'dairy'],
  },
  calorie: Number,
  carb: Number,
  protein: Number,
  fat: Number,
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
});

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

const Item = mongoose.model('Item', itemSchema);
const Female = mongoose.model('Female', femaleSchema);
const Male = mongoose.model('Male', maleSchema);

module.exports = {
  db,
  Item,
  Female,
  Male
}