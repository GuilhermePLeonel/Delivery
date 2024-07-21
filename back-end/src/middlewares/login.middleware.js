const loginService = require('../services/auth.service');

const validateToken = async (req, _res, next) => {
    const { loginAutorization } = req.headers;
    const user = loginService.validateToken(loginAutorization);
    req.user = user;

    next();
};

module.exports = { validateToken };