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

let count = 0;


async function readEveryLine() {

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
      count++
    }

    if (count === 50) {
      rl.close();
    }
  }
}

readEveryLine()
