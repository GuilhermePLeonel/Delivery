// import '../styles/login.css';
import React, { useState, useEffect } from 'react';
import validator from 'validator';
import { Navigate, useNavigate } from 'react-router-dom';
import { requestLogin } from '../services/requests';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const [fieldsValidation, setFieldsValidation] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [Role, setRole] = useState('');
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    try {
      const data = await requestLogin(email, password);
      const { name, role, token } = data;
      setFailedTryLogin(false);
      localStorage.setItem('user', JSON.stringify(
        { email, name, role, token },
      ));
      setRole(role);
      setRedirect(true);
    } catch (error) {
      setFailedTryLogin(true);
    }
  };

  const validateFields = async () => {
    const six = 6;
    if (validator.isEmail(email) && password.length >= six) {
      setFieldsValidation(true);
    } else {
      setFieldsValidation(false);
    }
  };

  if (Role === 'administrator') {
    navigate('/admin/manage');
  }

  useEffect(() => {
    // if (localStorage.getItem('user')) {
    //   navigate('/customer/products');
    // }
    validateFields();
    setFailedTryLogin(false);
  }, [email, password]);

  if (redirect) return <Navigate to="/customer/products" />;

  return (
    <div>
      <section className="user-login-area">
        <form>
          <h1>Área do usuário</h1>
          <label htmlFor="email-input">
            <input
              className="login__login_input"
              type="email"
              value={ email }
              onChange={ ({ target: { value } }) => setEmail(value) }
              data-testid="common_login__input-email"
              placeholder="Login"
            />
          </label>
          <label htmlFor="password-input">
            <input
              type="password"
              value={ password }
              onChange={ ({ target: { value } }) => setPassword(value) }
              data-testid="common_login__input-password"
              placeholder="Senha"
            />
          </label>
          <button
            data-testid="common_login__button-login"
            type="submit"
            disabled={ !fieldsValidation }
            onClick={ (event) => login(event) }
          >
            LOGIN
          </button>
          <button
            data-testid="common_login__button-register"
            type="submit"
            onClick={ () => navigate('/register') }
          >
            Ainda não tenho conta
          </button>
          {
            (failedTryLogin)
              ? (
                <p data-testid="common_login__element-invalid-email">
                  {
                    `O endereço de e-mail ou a senha não estão corretos.
                        Por favor, tente novamente.
                        `
                  }
                </p>
              )
              : null
          }
        </form>
      </section>
    </div>
  );
}
export default Login;
