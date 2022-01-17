const mongoose = require('mongoose');
const { Schema } = mongoose;


const answerSchema = new Schema({
  _id: { type: Number },
  question_id: { type: Number },
  body: { type: String, minLength: 2, maxLength: 1000 },
  created_at: { type: String },
  answerer_name: { type: String, minLength: 3, maxLength: 60 },
  answerer_email: { type: String, minLength: 3, maxLength: 60 },
  reported: { type: Boolean },
  answer_helpfulness: { type: Number }
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer;