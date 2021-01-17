const yup = require("yup");

const todoGetSchema = yup.object().shape({
  user_id: yup.string().required(),
});

const todoAddSchema = yup.object().shape({
  title: yup.string().required().min(5),
  description: yup.string().required().min(5),
  user_id: yup.string().required(),
  category_id: yup.string().required(),
});

const todoRemoveSchema = yup.object().shape({
  user_id: yup.number().required(),
  todo_id: yup.number().required(),
});

const todoUpdateSchema = yup.object().shape({
  title: yup.string().required().min(5),
  description: yup.string().required().min(5),
  user_id: yup.string().required(),
  category_id: yup.string().required(),
  todo_id: yup.string().required(),
});

const todoUpdateStatusSchema = yup.object().shape({
  user_id: yup.number().required(),
  todo_id: yup.number().required(),
});

module.exports = {
  todoGetSchema,
  todoAddSchema,
  todoRemoveSchema,
  todoUpdateSchema,
  todoUpdateStatusSchema,
};
