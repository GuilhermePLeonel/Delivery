const Joi = require('joi');

const minName = 12;
const minPassword = 6;

const registerSchema = Joi.object({
  name: Joi.string().min(minName).required(),
  password: Joi.string().min(minPassword).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
}).messages({
  'any.required': 'Todos os campos devem ser preenchidos',
});

module.exports = { registerSchema };
