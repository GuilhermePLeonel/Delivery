const authService = require('../services/auth.service');

const login = async (req, res) => {
  const valBody = authService.validateBody(req.body);
  const { email, password } = req.body;
  if (valBody.error) {
    const result = authService.validateBody(req.body);
    return res.status(400).json({ message: result });
  }
  
  const validate = await authService.validateLogin(email, password);
  if (validate.message === 'Invalid fields') {
    return res.status(404).json(validate);
  } 
    return res.status(200).json({ 
    token: validate.token,
    name: validate.name,
    email: validate.email,
    role: validate.role,
    id: validate.id,
  });
};

module.exports = { login };
