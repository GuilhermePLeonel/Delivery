const Joi = require('joi');
const jwtUtil = require('../utils/jwt.util');

const { User } = require('../database/models');

const validateBody = (params) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
  
    const { error, value } = schema.validate(params);
  
    if (error) {
      const e = 'Some required fields are missing';
      return { error: e };
    }
  
    return value;
  };

const validateLogin = async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });
  
    if (!user || user.password !== password) {
      const message = 'Invalid fields';
      return { message };
    }
  
    const { password: _, ...userWithoutPassword } = user.dataValues;
  
    const token = jwtUtil.createToken(userWithoutPassword);
  
    return { token };
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