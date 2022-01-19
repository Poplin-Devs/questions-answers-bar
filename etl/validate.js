
const validateId = (id) => {
  if (typeof id == 'number') {
    return true;
  } else {
    return false;
  }
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
    id,
    product_id,
    question_body,
    asker_name,
    asker_email,
    question_helpfulness
  } = entry;

  const questionTest = [
    validateId(id),
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
    validateId(entry.answer_id),
    validateId(entry.question_id),
    validateBody(entry.body),
    validateName(entry.answerer_name),
    validateEmail(entry.answerer_email),
    validateNumber(entry.helpfulness)
  ]
  const allTestPass = answerValidations.every((test) => {
    if (test) {
      return true;
    } else {
      return false;
    }
  })
  return allTestPass
}

const validatePhoto = (entry) => {
  const photoValidations = [
    validateId(entry.id),
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
