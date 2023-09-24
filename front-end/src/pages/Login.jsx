import React, { useState, useEffect } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { requestLogin } from "../services/requests";
import Footer from "../../src/components/Footer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const [fieldsValidation, setFieldsValidation] = useState(false);
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    try {
      const data = await requestLogin(email, password);
      const { name, role, token } = data;
      setFailedTryLogin(false);
      localStorage.setItem(
        "user",
        JSON.stringify({ email, name, role, token })
      );
      if (role === "seller") {
        navigate("/seller/orders");
      } else {
        navigate("/customer/products");
      }
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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.role === "seller") {
        navigate("/seller/orders");
      } else {
        navigate("/customer/products");
      }
    }
    validateFields();
    setFailedTryLogin(false);
  }, [email, password]);

  return (
    <main class=" absolute m-0 p-0 h-full w-full flex flex-col">
      <img
        class="mx-auto h-20 w-auto mt-4 "
        src={require("../images/LOGO.png")}
        alt="logo"
      ></img>
      <section class="mt-8 sm:mx-auto sm:w-full sm:max-w-sm flex-grow">
        <form
          className="space-y-6 md:space-y-6 max-w-md mx-auto p-8 bg-white rounded-lg "
          action="#"
        >
          <h1 class="leading-tight tracking-tight text-gray-900  dark:text-white text-center">
            Insira seu e-mail e senha para entrar:
          </h1>
          <label
            htmlFor="email-input"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            <input
              class="border-2 border-yellow-400 p-2 rounded-md w-full h-12 focus:border-spacing-10 focus:border-yellow-600 focus:outline-none"
              type="email"
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
              data-testid="common_login__input-email"
              placeholder="E-mail"
            />
          </label>
          <label
            htmlFor="password-input"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            <input
              class="border-2 border-yellow-400 p-2 rounded-md w-full h-12 focus:border-spacing-10 focus:border-yellow-600 focus:outline-none"
              type="password"
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
              data-testid="common_login__input-password"
              placeholder="Senha"
            />
          </label>
          <button
            data-testid="common_login__button-login"
            type="submit"
            disabled={!fieldsValidation}
            onClick={(event) => login(event)}
            className="bg-yellow-200  enabled:bg-yellow-500 text-white enabled:text-white font-bold py-2 px-4 rounded-full w-full h-12 enabled:hover:text-white  enabled:hover:scale-105 
            enabled:hover:bg-yellow-600 transition duration-300"
          >
            Entrar
          </button>
          <div class="relative flex py-5 items-center">
            <div class="flex-grow border-t border-gray-400"></div>
            <span class="flex-shrink mx-4 text-gray-400">OU</span>
            <div class="flex-grow border-t border-gray-400"></div>
          </div>
          <h3 class=" leading-tight tracking-tight text-gray-900  dark:text-white text-center">
            Crie uma nova conta:
          </h3>
          <button
            data-testid="common_login__button-register"
            type="submit"
            onClick={() => navigate("/register")}
            className="bg-yellow-500  text-white font-bold py-2 px-4 rounded-full w-full h-12 hover:bg-yellow-600 hover:text-white  hover:scale-105 transition duration-300"
          >
            Cadastrar
          </button>

          {failedTryLogin ? (
            <p
              data-testid="common_login__element-invalid-email"
              className="text-red-600"
            >
              O endereço de e-mail ou a senha não estão corretos. Por favor,
              tente novamente.
            </p>
          ) : null}
        </form>
      </section>
      <Footer />
    </main>
  );
}

export default Login;
