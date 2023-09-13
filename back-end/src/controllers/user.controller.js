const userService = require("../services/user.service");
const { validateToken } = require("../utils/jwt.util");
const { User } = require("../database/models");

const createUser = async (req, res) => {
  const response = await userService.createUser(req.body);
  const { message } = response;

  if (message) {
    if (message === "User already registered") {
      return res.status(409).send({ message });
    }
    return res.status(400).json({ message });
  }
  return res.status(201).json(response);
};

const getUser = async (req, res) => {
  const { authorization } = req.headers;
  const { message } = await validateToken(authorization);

  if (!authorization) {
    return res.status(401).json({ message: "Token not found" });
  }
  if (message) {
    return res.status(401).json({ message });
  }
  const user = await userService.getUser();

  return res.status(200).json(user);
};

const getUserByEmail = async (req, res) => {
  const user = await User.findAll();
  return res.status(200).json(user);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const { message } = await validateToken(authorization);

  if (!authorization) {
    return res.status(401).json({ message: "Token not found" });
  }
  if (message) {
    return res.status(401).json({ message });
  }
  const user = await userService.getUserById(id);
  if (user.length === 0) {
    return res.status(404).json({
      message: "User does not exist",
    });
  }
  return res.status(200).json(user[0]);
};

const getUserByRole = async (req, res) => {
  const { authorization } = req.headers;
  const { message } = await validateToken(authorization);

  if (!authorization) {
    return res.status(401).json({ message: "Token not found" });
  }
  if (message) {
    return res.status(401).json({ message });
  }
  const user = await userService.getUserByRole();

  return res.status(200).json(user);
};

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByEmail,
  getUserByRole,
};
