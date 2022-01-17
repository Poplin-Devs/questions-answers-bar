const mongoose = require('mongoose');
const { Schema } = mongoose;


const photoSchema = new Schema({
  __id: { type: Number },
  answer_id: { type: Number },
  url: { type: String, minLength: 2, maxLength: 255 },
})

const Photo = mongoose.model('Photo', photoSchema)

module.exports = Photo;