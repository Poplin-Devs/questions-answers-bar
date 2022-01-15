function validateEmail(email) {
  const splitEmail = email.split('')
  if (splitEmail.length > 256) {
    return false;
  } else if (splitEmail.length < 3) {
    return false;
  }
  return true;
}

function validateName(name) {
  return name.length < 60 && name.length > 3 ? true : false;

}

function validateId(id) {
  return Number(id) > 0 ? true : false;
}

function validateReported(reported) {
  return reported ? true : false;
}

function validateBody(body) {
  return body.length < 1000 && body.length > 8 ? true : false;
}

function validateNumber(integer) {
  return Number(integer) ? true : false;
}

module.exports = {
  validateEmail,
  validateId,
  validateReported,
  validateName,
  validateNumber,
  validateBody
}