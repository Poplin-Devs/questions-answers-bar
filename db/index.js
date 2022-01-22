const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');
const import
const db = client.db('sdc');

async getQuestions(page=1, count=5) {
  await client.connect();

  console.log('Connected successfully to server');
  const collection = db.collection('questions');
};

module.exports = {
  getQuestions
};