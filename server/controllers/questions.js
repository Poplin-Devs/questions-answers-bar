const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');
const db = client.db('sdc');


async function readQuestions( product_id ,page = 1, count = 5) {
  await client.connect();
  const collection = db.collection('questions');
  const totalQuestions = page * count;
  const foundQuestions = await collection
  .find({ product_id: Number(product_id) }, {answers: 0})
  .limit(totalQuestions)
  .toArray()

  //Format our questions
  const formatedQuestions = foundQuestions.map((question) => {

    const { id, question_body, question_date, asker_name,
      question_helpfulness, answers, reported } = question

    //format that question's answers
    const formattedAnswers = answers.map((answer) => {
      const { answer_id, question_id, body, date,
        answerer_name, helpfulness, photos } = answer;

      if (!answers.reported) {
        return {
          answer_id,
          question_id,
          body,
          date,
          answerer_name,
          helpfulness
        }
      }
    })

    if (!reported) {
      return {
        question_id: id,
        question_body,
        question_date,
        asker_name,
        question_helpfulness,
        answers: formattedAnswers
      }
    }
  })
  return formatedQuestions;
};

async function writeQuestion(question) {
  await client.connect();
  const collection = db.questions('questions');
  console.log('addQuestion was called')
}

async function readAnswers(question_id, page=1, count=5) {
  //db.questions.find({id: 18}, {nswers: 1})
  await client.connect();
  const collection = db.collection('questions');
  const totalAnswers = page * count;
  const foundQuestion = await collection
  .find({id: Number(question_id)}, {answers: 1})
  .limit(totalAnswers)
  .toArray();

  const formattedAnswers = foundQuestion[0]['answers']
  .map((answer) => {
    const { answer_id, question_id, body, date, reported,
      answerer_name, helpfulness, photos } = answer;
    if (!reported) {
      const answerFormated = { answer_id, body, date, helpfulness, photos }
      return answerFormated
    }
  })
  return formattedAnswers;
}



module.exports = {
  readQuestions,
  writeQuestion,
  readAnswers
};


