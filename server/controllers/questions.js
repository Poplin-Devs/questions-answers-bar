const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');
const db = client.db('sdc');


async function getQuestions( product_id ,page = 1, count = 5) {
  await client.connect();
  const collection = db.collection('questions');
  const totalQuestions = page * count
  const foundQuestions = await collection
  .find({ product_id: Number(product_id) })
  .limit(totalQuestions)
  .toArray()
  return foundQuestions;
};

async function postQuestion(question) {
  await client.connect();
  const collection = db.questions('questions');

}

module.exports = {
  getQuestions,
  postQuestion
};


