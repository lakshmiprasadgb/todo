const path = require("path");
const todoCategoryDTO = require(path.join(
  __dirname,
  "../dto/todo-category-dto"
));

const validateTodoCatoryGetDTO = async (req, res, next) => {
  try {
    const validateBody = await todoCategoryDTO.categoryGetSchema.validate(
      req.params
    );
    req.params = validateBody;
    next();
  } catch (err) {
    res.status(400).json(err["errors"]);
  }
};

const validateTodoCatoryAddDTO = async (req, res, next) => {
  try {
    const validateBody = await todoCategoryDTO.categoryAddSchema.validate(
      req.body
    );
    req.body = validateBody;
    next();
  } catch (err) {
    res.status(400).json(err["errors"]);
  }
};

const validateTodoCatoryRemoveDTO = async (req, res, next) => {
  try {
    const validateBody = await todoCategoryDTO.categoryRemoveSchema.validate(
      req.body
    );
    req.body = validateBody;
    next();
  } catch (err) {
    res.status(400).json(err["errors"]);
  }
};

module.exports = {
  validateTodoCatoryGetDTO,
  validateTodoCatoryAddDTO,
  validateTodoCatoryRemoveDTO,
};
