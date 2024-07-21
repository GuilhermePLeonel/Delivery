const Joi = require('joi');
// const CryptoJS = require('crypto-js');
const md5 = require('md5');
const jwtUtil = require('../utils/jwt.util');

const { User } = require('../database/models');

const validateBody = (params) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
  
    const validate = schema.validate(params);
  
    if (validate.error) {
      const e = 'Some required fields are missing';
      return { error: e };
    } 
      return validate.value;
  };

const validateLogin = async (email, password) => {
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== md5(password).toString()) {
      const message = 'Invalid fields';
      return { token: null, message };
    }
    const { password: _, ...userWithoutPassword } = user.dataValues;

    const { name, role, id } = user.dataValues;
    const token = jwtUtil.createToken(userWithoutPassword);
    return { token, name, email, role, id };
  };

const validateUser = async (params) => {
  const schema = Joi.object({
    name: Joi.string().min(8).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
  });

  const { error } = schema.validate(params);

  if (error) {
    const { message } = error;
    return { error: message };
  }
  const { email } = params;
  const duplicated = await User.findOne({ where: { email } });
  if (duplicated) {
    return { error: 'User already registered' };
  }
  const token = jwtUtil.createToken(params);
  return { token };
};

const validateCategory = async (params) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  const { error } = schema.validate(params);

  if (error) {
    const { message } = error;
    return { error: message };
  }
  return { params };
};

module.exports = { 
  validateBody,
  validateLogin, 
  validateUser,
  validateCategory,
};
