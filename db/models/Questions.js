const mongoose = require('mongoose');
const { Schema } = mongoose;


const questionSchema = new Schema({
  _id: { type: Number },
  product_id: { type: Number },
  question_body: { type: String, minLength: 2, maxLength: 1000 },
  created_at: { type: String },
  asker_name: { type: String, minLength: 3, maxLength: 60 },
  asker_email: { type: String, minLength: 3, maxLength: 60 },
  question_helpfulness: { type: Number }
})

module.exports = mongoose.model('Question', questionSchema)