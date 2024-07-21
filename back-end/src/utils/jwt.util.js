const { sign, verify } = require('jsonwebtoken');
const jwtKey = require('fs')
  .readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });

require('dotenv/config');

const createToken = (data) => {
    const token = sign(
        { data }, jwtKey,
        {
        expiresIn: '1d',
        algorithm: 'HS256',
        },
    );

    return token;
};

const validateToken = (token) => {
    // if (!token) throw new Error('Token not found');

    try {
        const { data } = verify(token, jwtKey);
        return data;
    } catch (error) {
        const e = new Error('Expired or invalid token');
        return e;
    }
};

module.exports = { createToken,
    validateToken,
};
