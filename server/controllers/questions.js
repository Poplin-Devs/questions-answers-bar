const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');
const db = client.db('sdc');

async function nextQuestionId() {
  await client.connect();
  const collection = db.collection('questions');
  const lastId = await collection
  .find({}, {'answers': 0})
  .sort({'id': -1})
  .limit(1)
  .toArray()
  const newId = lastId[0]['id'] + 1
  return newId;
}

async function readQuestions( product_id ,page = 1, count = 5) {
  await client.connect();
  const collection = db.collection('questions');
  const totalQuestions = page * count;
  const foundQuestions = await collection
  .find({ product_id: product_id}, {answers: 0})
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
  const collection = db.collection('questions');
  const nextId = await nextQuestionId();
  const date = new Date().toISOString();
  const { name, body, email, product_id } = question;
  const newQuestion = {
    id: nextId,
    product_id: Number(product_id),
    question_body: body,
    question_date: date,
    asker_name: name,
    asker_email: email,
    reported: false,
    question_helpfulness: 0,
    answers: []
  }
  const insertedQuestion = await collection.insertOne(newQuestion);

  return insertedQuestion;
}

async function updateHelpfulQuestion(question_id) {
  await client.connect();
  const collection = db.collection('questions');
  const updatedQuestions = await collection.updateOne({"id": question_id},
    {"$inc": {"question_helpfulness": 1}}
  )
  return updatedQuestions;
}


async function readAnswers(question_id, page=1, count=5) {
  //db.questions.find({id: 18}, {nswers: 1})
  await client.connect();
  const collection = db.collection('questions');
  const totalAnswers = page * count;
  const foundQuestion = await collection
  .find({id: question_id}, {answers: 1})
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

async function writeAnswer(answer) {

}

async function updateHelpfulAnswer(answer_id) {
  await client.connect();
  const collection = db.collection('questions');
  const updatedAnswer = await collection.updateOne({"answers.answer_id": answer_id},
    {"$inc": { "answers.$.helpfulness": 1}}
  )
  return updatedAnswer;
}



module.exports = {
  readQuestions,
  writeQuestion,
  updateHelpfulQuestion,
  readAnswers,
  writeAnswer,
  updateHelpfulAnswer
};


