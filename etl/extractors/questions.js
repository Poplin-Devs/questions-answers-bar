
const LineByLineReader = require('line-by-line');
const writeBuffer = require('../load')
const { validateQuestion } = require('../validate');

let buffer = [];
let count = 0;
let errors = 0;
let lr = new LineByLineReader('../../data/questions.csv');

lr.on('line', (line) => {
  lr.pause();

  const splitLine = line.split(',');
  const [
    id,
    product_id,
    question_body,
    question_date,
    asker_name,
    asker_email,
    reported,
    questionHelpful
  ] = splitLine;

  const newQuestion = {
    id: Number(id),
    product_id: Number(product_id),
    question_body,
    question_date,
    asker_name,
    asker_email,
    reported: reported === 1 ? true : false,
    question_helpfulness: Number(questionHelpful)
  }

  if (validateQuestion(newQuestion)) {
    buffer.push(newQuestion)
  } else {
    console.log('Bad Entry! ', newQuestion)
  }
  //TODO: Put bad entries into

  if (buffer.length === 1000000) {
    count += buffer.length;
    writeBuffer(buffer, 'sdc', 'questions')
      .then((result) => {
        console.log(`Read and qued question entries: ${count}`);
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
  writeBuffer(buffer, 'sdc', 'questions')
    .then(() => {
      console.log(`Done reading..`)
    })
    .catch(error => console.error(error))
})