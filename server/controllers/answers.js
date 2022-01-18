const Answer = require('../../db/models/Answers')

async function getAnswers() {
  console.log('Get answers was called!')
  const answers = await Answer.find({})
  return answers;
}

async function addAnswer() {
  console.log('Add answer was called!')
}

module.exports = {
  getAnswers,
  addAnswer
}