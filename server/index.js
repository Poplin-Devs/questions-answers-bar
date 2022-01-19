
const express = require('express');
const { getQuestions } = require('./controllers/questions')
const cors = require('cors');
const bodyParser = require('body-parser');

app = express();
app.use(cors());
app.use(bodyParser.json());

//QA get questions
app.get('/qa/questions', (req, res) => {

  const { product_id, count, page } = req.query;

  getQuestions(product_id).then((results)=> {
    console.log('This is our response from our database ', results)
    const questionData = {
      product_id,
      results
    }
    res.send(questionData);
  })

  //Should have product_id
  //may have page num default 1
  //may have count num default 5

  //should return an array of results
  console.log('Get Questions Request recieved with these parameters', req.query)
})


//QA get answers
app.get('/qa/questions/:question_id/answers', (req, res) => {
  //Should have a question_id
  //may have page numb default 1
  //may have count numb default 5
  console.log('these are our answer request params',req.params)
  res.send(`\n Get answers was responded too`);
})


//Add a question
app.post('/qa/questions', (req, res) => {
  console.log('Post question recieved with these queries', req.params)
  console.log('and body ', req.body)
})

//Add an answers
app.post('/qa/questions/:question_id/answers', (req, res) => {
  console.log('Post answer recieved with these queries', req.params)
  console.log('and body ', req.body)
})

//Question was helpful
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  //should have questions id
})


//Answer was helpful
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  //should have an answer_id
})

//Report an answer
app.put('/qa/answers/:answer_id/report', (req, res) => {
  //should have an answer_id
})

app.listen(port=8080, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})