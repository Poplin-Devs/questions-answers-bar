const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');
const db = client.db('sdc');
const collection = db.collection('questions');

async function nextQuestionId() {
  await client.connect();
  const lastId = await collection
  .find({}, {'answers': 0})
  .sort({'id': -1})
  .toArray();
  const newId = lastId[0]['id'] + 1;
  return newId;
}

async function nextAnswerId() {
  await client.connect();
  const lastIdFind = await collection
  .find()
  .sort({'answers.answer_id': -1})
  .limit(1)
  .toArray();
  const answers = lastIdFind[0].answers;
  const lastId = answers[answers.length - 1]['answer_id'];
  const nextId = lastId + 1;
  return nextId;
}

async function readQuestions( product_id ,page = 1, count = 5) {
  await client.connect();
  const totalQuestions = page * count;
  const foundQuestions = await collection
  .find({ product_id: product_id}, {answers: 0})
  .limit(totalQuestions)
  .toArray();

  //Format our questions
  const formatedQuestions = foundQuestions.map((question) => {

    const { id, question_body, question_date, asker_name,
      question_helpfulness, answers, reported } = question;

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
      };
    })

    if (!reported) {
      return {
        question_id: id,
        question_body,
        question_date,
        asker_name,
        question_helpfulness,
        answers: formattedAnswers
      };
    };
  });
  return formatedQuestions;
};

async function writeQuestion(question) {
  await client.connect();
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
  const updatedQuestions = await collection
  .updateOne({"id": question_id},
    {"$inc": {"question_helpfulness": 1}}
  )
  return updatedQuestions;
}

async function reportQuestion(question_id) {
  await client.connect();
  const updatedQuestions = await collection
  .updateOne({"id": question_id},
    {"$set": {"reported": true}})
  return updatedQuestions;
}

async function readAnswers(question_id, page=1, count=5) {
  //db.questions.find({id: 18}, {nswers: 1})
  await client.connect();
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
  await client.connect();
  const nextId = await nextAnswerId();
  const date = new Date().toISOString();
  const { name, body, email, photos, question_id } = answer;
  const newAnswer = {
    answer_id: nextId,
    question_id,
    body,
    date,
    answerer_name: name,
    answerer_email: email,
    reported: false,
    helpfulness: 0,
    photos
  }
  const insertAnswer = await collection
  .updateOne({'id': question_id}, {'$push': {'answers': newAnswer}})
  return insertAnswer;
}

async function updateHelpfulAnswer(answer_id) {
  await client.connect();
  const updatedAnswer = await collection.updateOne({"answers.answer_id": answer_id},
    {"$inc": { "answers.$.helpfulness": 1}}
  )
  return updatedAnswer;
}

async function reportAnswer(answer_id) {
  await client.connect();
  const updatedAnswer = await collection.updateOne({"answers.answer_id": answer_id},
    {"$set": { "answers.$.reported": true}}
  )
  return updatedAnswer;
}




module.exports = {
  readQuestions,
  writeQuestion,
  updateHelpfulQuestion,
  reportQuestion,
  readAnswers,
  writeAnswer,
  updateHelpfulAnswer,
  reportAnswer
};


