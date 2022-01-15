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
  const rl = readline.createInterface({
    input: fs.createReadStream('../data/answers.csv'),
    crlfDelay: Infinity
  });

  let errors = 0;
  let count = 0;

  for await (const line of rl) {

    const splitLine = line.split(',');
    const [
      answerId,
      questionId,
      answerBody,
      answerDate,
      answererName,
      answererEmail,
      reported,
      answerHelpful
    ] = splitLine;
    console.log('Fields ', line, '\n\n ')
    if (count > 1) {
      const hasValidIds = validateId(answerId) && validateId(questionId);
      const hasValidName = validateName(answererName);
      const hasValidBody = validateBody(answerBody);
      const hasValidEmail = validateEmail(answererEmail);
    }

    if (errors > 0) {
      rl.close('There was an error !');
    }
    count++
  }
}

readEveryLine()
