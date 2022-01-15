const fs = require('fs');
const readline = require('readline');
const {
  validateEmail,
  validateId,
  validateReported,
  validateBody,
  validateNumber,
  validateName
} = require('./fieldCheckers.js');

async function readEveryLine() {
  let count = 0;
  const rl = readline.createInterface({
    input: fs.createReadStream('../data/answers.csv'),
    crlfDelay: Infinity
  });


  for await (const line of rl) {
    const writer = fs.createWriteStream('../data/answers-clean.csv');
    const splitLine = line.split(',');
    const [
      answerId,
      questionId,
      answerBody,
      answerDate,
      answererName,
      answererEmail,
      reported
    ] = splitLine;
    console.log(line)
    if (count > 1) {
      console.log('Valid answer Id: ', answerId, validateId(answerId))
      console.log('Valid question Id: ', questionId, validateId(questionId))
      console.log('Valid body: ', answerBody, validateBody(answerBody))
      console.log('Valid name: ', answererName, validateName(answererName))
      console.log('Valid email: ', answererEmail, validateEmail(answererEmail))
      console.log('valid reported: ', reported, validateReported(reported))
      count++
    }

    if (count === 50) {
      rl.close();
    }
  }
}

readEveryLine()
