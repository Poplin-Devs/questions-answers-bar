const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost:27017/sdc');

db
.then(db => console.log('Connected to mongo!'))
.catch(err => console.error('Error! ', err))

module.exports = db;
