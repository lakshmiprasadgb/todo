const path = require("path");
const todoItemSchema = require(path.join(__dirname, "../dto/todo-item-dto"));

const validateTodoGetDTO = async (req, res, next) => {
  try {
    const validateBody = await todoItemSchema.todoGetSchema.validate(
      req.params
    );
    req.params = validateBody;
    next();
  } catch (err) {
    res.status(400).json(err["errors"]);
  }
};
const validateTodoAddDTO = async (req, res, next) => {
  try {
    const validateBody = await todoItemSchema.todoAddSchema.validate(req.body);
    req.body = validateBody;
    next();
  } catch (err) {
    res.status(400).json(err["errors"]);
  }
};

const validateTodoRemoveDTO = async (req, res, next) => {
  try {
    const validateBody = await todoItemSchema.todoRemoveSchema.validate(
      req.params
    );
    req.params = validateBody;
    next();
  } catch (err) {
    res.status(400).json(err["errors"]);
  }
};

const validateTodoUpdateDTO = async (req, res, next) => {
  try {
    const validateBody = await todoItemSchema.todoUpdateSchema.validate(
      req.body
    );
    req.body = validateBody;
    next();
  } catch (err) {
    res.status(400).json(err["errors"]);
  }
};

const validateTodoUpdateStatusDTO = async (req, res, next) => {
  try {
    const validateBody = await todoItemSchema.todoUpdateStatusSchema.validate(
      req.params
    );
    req.params = validateBody;
    next();
  } catch (err) {
    res.status(400).json(err["errors"]);
  }
};

module.exports = {
  validateTodoGetDTO,
  validateTodoAddDTO,
  validateTodoRemoveDTO,
  validateTodoUpdateDTO,
  validateTodoUpdateStatusDTO,
};
