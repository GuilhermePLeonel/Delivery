const express = require('express');
const loginController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/', (req, res) => loginController.login(req, res));
router.put('/', loginController.login);

module.exports = router;