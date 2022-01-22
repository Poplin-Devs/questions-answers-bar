
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const {
  readQuestions,
  readAnswers,
  updateHelpfulQuestion,
  updateHelpfulAnswer
} = require('./controllers/questions')

app = express();
app.use(bodyParser.json());
app.use(cors());
//Request Authorization
app.use((req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(403).json({ error: "No credentials sent!" });
  }
  next();
});

//QA get questions
app.get('/qa/questions', (req, res) => {
  const { product_id, count, page } = req.query;
  if (!product_id) res.status(400).send(err);
  readQuestions(Number(product_id), page, count)
  .then((questions)=> {
    const questionData = {
      product_id,
      page,
      count,
      results: questions
    }
    res.status(200).json(questionData);
  })
  .catch(err => res.status(500).send(err))
})

//QA get answers
app.get('/qa/questions/:question_id/answers', (req, res) => {
  const { question_id } = req.params;
  const { page, count } = req.query;
  if (!question_id) res.status(400).send(err);
  readAnswers(Number(question_id), page, count)
  .then((answers) => {
    const answerData = {
      question: question_id,
      page,
      count,
      results: answers
    }
    res.status(200).json(answerData)
  })
  .catch(err => res.status(500).send(err))
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
  const { question_id } = req.params;
  if (!question_id) res.status(400).send();
  updateHelpfulQuestion(Number(question_id))
  .then((response) => {
    res.status(201).send()
  })
  .catch((err) => console.error(err));
});


//Answer was helpful
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  const { answer_id } = req.params;
  if (!answer_id) res.status(400).send();
  updateHelpfulAnswer(Number(answer_id))
  .then((response) => {
    res.status(201).send()
  })
  .catch((err) => console.error(err));
})


app.listen(port=8080, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})