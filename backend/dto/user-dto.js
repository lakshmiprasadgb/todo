const yup = require("yup");

const userAuthSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

const userGetSchema = yup.object().shape({
  email: yup.string().required().email(),
});

module.exports = { userAuthSchema, userGetSchema };
