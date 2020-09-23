//VALIDATION
const Joi = require("@hapi/Joi");

const registerValidation = (data) => {
  //data validation
  //according to new version
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};
const loginValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
