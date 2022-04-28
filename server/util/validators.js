const validateEmail = (email) => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validateUsername = (username) => {
  const re = /^[A-Za-z0-9_]+$/;
  return re.test(username);
};

const validators = {
  validateEmail,
  validateUsername,
};

module.exports = validators;
