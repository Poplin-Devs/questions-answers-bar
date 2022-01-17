
const validateId = (id) => {
  id = Number(id)
  if (typeof id == 'number') return true;
  return false;
}

const validateBody = (body) => {
  if (body) {
    return (body.length < 1000 && body.length > 3) ? true : false;
  } else {
    return false;
  }
};

const validateName = (name) => {
  if (name) {
    return name.length < 60 && name.length > 3 ? true : false;
  } else {
    return false
  }
}

const validateEmail = (email) => {
  if (email) {
    if (email.length > 256 && email.length < 3) {
      return false;
    }
    return true;
  } else {
    return false;
  }
}

const validateNumber = (integer) => {
  if (typeof integer == 'number') {
    return true;
  } else {
    return false;
  }
}

const validateQuestion = (entry) => {
  const {
    _id,
    product_id,
    question_body,
    created_at,
    asker_name,
    asker_email,
    reported,
    question_helpfulness
  } = entry;

  const questionTest = [
    validateId(_id),
    validateId(product_id),
    validateBody(question_body),
    validateName(asker_name),
    validateEmail(asker_email),
    validateNumber(question_helpfulness)
  ]

  const allTestPass = questionTest.every((test) => {
    if (test) {
      return true;
    } else {
      return false;
    }
  })
  return allTestPass
}

const validateAnswer = (entry) => {

  const answerValidations = [
    validateId(entry._id),
    validateId(entry.question_id),
    validateBody(entry.body),
    validateName(entry.answerer_name),
    validateEmail(entry.answerer_email),
    validateNumber(entry.answer_helpfulness)
  ]
  const allTestPass = answerValidations.every((test) => {
    if (test) {
      return true;
    } else {
      console.log('\n\n\n\ Test failed! \n\n\n\n')
      return false;
    }
  })
  return allTestPass
}

const validatePhoto = (entry) => {
  const photoValidations = [
    validateId(entry._id),
    validateId(entry.answer_id),
    validateBody(entry.url)
  ]
  const allTestPass = photoValidations.every((test) => {
    return (test) ? true : false;
  })
  return allTestPass
}

module.exports = {
  validateQuestion,
  validateAnswer,
  validatePhoto
}