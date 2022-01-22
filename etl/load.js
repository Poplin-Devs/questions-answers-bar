const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');

async function writeBuffer(buffer, targetDB, targetCollection) {
  const db = client.db(`${targetDB}`)
  const collection = db.collection(`${targetCollection}`);
  await client.connect();

  collection.insertMany(buffer)
  .then((response) => {
    console.log(`entries succesfully loaded..`)
  })
  .catch(err => console.error(err))
}

module.exports = writeBuffer;