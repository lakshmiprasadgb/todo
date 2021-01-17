const yup = require("yup");

const categoryGetSchema = yup.object().shape({
  user_id: yup.string().required(),
});

const categoryAddSchema = yup.object().shape({
  user_id: yup.string().required(),
  name: yup.string().required().min(5),
  color: yup.string().required(),
});

const categoryRemoveSchema = yup.object().shape({
  user_id: yup.string().required(),
  category_id: yup.string().required(),
});

module.exports = {
  categoryGetSchema,
  categoryAddSchema,
  categoryRemoveSchema,
};
