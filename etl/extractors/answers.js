
const LineByLineReader = require('line-by-line');
const writeBuffer = require('../load')
const { validateAnswer } = require('../validate');

let buffer = [];
let count = 0;
let errors = 0;
let lr = new LineByLineReader('../../data/answers.csv');

lr.on('line', (line) => {

  lr.pause();
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

  const newEntry = {
    answer_id: Number(answerId),
    question_id: Number(questionId),
    body: answerBody,
    date: answerDate,
    answerer_name: answererName,
    answerer_email: answererEmail,
    reported: reported === 1 ? true : false,
    helpfulness: Number(answerHelpful)
  }

  if (validateAnswer(newEntry)) {
    buffer.push(newEntry)
  } else {
    lr.pause();
    console.log('Bad entry! :',newEntry)
  }

  if (buffer.length === 1000000) {
    count += buffer.length;
    writeBuffer(buffer, 'sdc', 'answers')
      .then((result) => {
        console.log(`Read and qued entries: ${count}`);
        buffer = [];
        setTimeout(()=> {
          lr.resume();
        }, 10000)
      })
      .catch((err) => {
        errors += 1;
        console.error(err);
      })
  }
  lr.resume();
})

lr.on('end', () => {
  console.log(`Loading final ${buffer.length} entires..`)
  writeBuffer(buffer, 'sdc', 'answers')
    .then(() => {
      console.log(`Done reading..`)
    })
    .catch(error => console.error(error))
})