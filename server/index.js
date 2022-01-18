
const express = require('express');
const db = require('../db');
const bodyParser = require('body-parser');

app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('Request recieved!')
  getAnswers();
  res.send('Get responded too.')
})

app.listen(port=8080, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})