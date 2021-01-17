const path = require("path");
const userDto = require(path.join(__dirname, "../dto/user-dto"));

const validateUserAuthDTO = async (req, res, next) => {
  try {
    const validateBody = await userDto.userAuthSchema.validate(req.body);
    req.body = validateBody;
    next();
  } catch (err) {
    res.status(400).json(err["errors"]);
  }
};

const validateUserGetDTO = async (req, res, next) => {
  try {
    const validateBody = await userDto.userGetSchema.validate(req.params);
    req.params = validateBody;
    next();
  } catch (err) {
    res.status(400).json(err["errors"]);
  }
};

module.exports = { validateUserAuthDTO, validateUserGetDTO };
