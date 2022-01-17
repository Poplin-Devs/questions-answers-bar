
const LineByLineReader = require('line-by-line');
const writeBuffer = require('../load')
const { validatePhoto } = require('../validate');
const start = performance.now();

let buffer = [];
let count = 0;
let errors = 0;
let lr = new LineByLineReader('../../data/answers_photos.csv');

lr.on('line', (line) => {
  lr.pause();
  const splitLine = line.split(',');
  const [_id, answer_id, url] = splitLine;
  const newEntry = { _id, answer_id, url }

  if (validatePhoto(newEntry)) {
    buffer.push(newEntry)
  } else {
    lr.pause()
    console.log('Broken entry ', newEntry)
  }

  if (buffer.length === 1000000) {
    count += buffer.length;
    writeBuffer(buffer, 'sdc', 'photos')
      .then((result) => {
        console.log(`Read and qued photo entries: ${count}`);
        buffer = [];
        setTimeout(() => {
          lr.resume();
        }, 5000)
      })
      .catch((err) => {
        errors += 1;
        console.error(err);
      })
  }
  lr.resume();
})

lr.on('end', () => {
  const end = performance.now()
  console.log(`Loading final ${buffer.length} entires..`)
  writeBuffer(buffer, 'sdc', 'photos')
    .then(() => {
      console.log(`Done reading..`)
    })
    .catch(error => console.error(error))
})