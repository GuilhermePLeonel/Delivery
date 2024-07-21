import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../Schemas/registerSchema";
import { requestCreate } from "../services/requests";
import Footer from "../../src/components/Footer";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [badRegister, setBadRegister] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const enabledButton = () => {
      const { error } = registerSchema.validate({ name, email, password });
      if (!error) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };

    enabledButton();
  }, [name, email, password]);

  const handleChangeName = (event) => {
    const { value } = event.target;
    setName(value);
  };

  const handleChangeEmail = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleChangePassword = (event) => {
    const { value } = event.target;
    setPassword(value);
  };

  const register = async () => {
    const success = 201;
    const { error, data, status } = await requestCreate({
      name,
      email,
      password,
    });
    console.log(error, data, status);
    if (status === success) {
      const mil = 1000;
      localStorage.setItem("user", JSON.stringify({ ...data }));
      setTimeout(async () => {
        navigate("/customer/products");
      }, mil);
      return null;
    } else {
      setBadRegister(true);
    }
  };

  const invalidRegisterMessage = (
    <p
      data-testid="common_register__element-invalid_register"
      className="text-red-600 mx-auto text-center"
    >
      Dados inválidos
    </p>
  );

  return (
    <main className="absolute m-0 p-0 h-full w-full flex flex-col">
      <header>
        <img
          className="mx-auto h-14 w-auto mt-4 "
          src="https://asset.brandfetch.io/idLUjftGpE/id3ssWp9D3.png?updated=1674220249738"
          alt="logo"
        ></img>
      </header>
      <section className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm flex-grow">
        <h3 className=" font-bold leading-tight tracking-tight text-gray-900  dark:text-white text-center mt-10">
          Faça seu cadastro:
        </h3>
        <form className="space-y-6 md:space-y-6 max-w-md mx-auto p-8 bg-white rounded-lg ">
          <label
            htmlFor="name-input-register"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            <input
              onChange={handleChangeName}
              data-testid="common_register__input-name"
              id="name-input-register"
              type="name"
              placeholder="Nome"
              className="border-2 border-yellow-400 p-2 rounded-md w-full h-12 focus:border-spacing-10 focus:border-yellow-600 focus:outline-none"
            />
          </label>
          <label
            htmlFor="email-input-register"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            <input
              onChange={handleChangeEmail}
              data-testid="common_register__input-email"
              id="email-input-register"
              type="email"
              placeholder="email@dominio.com"
              className="border-2 border-yellow-400 p-2 rounded-md w-full h-12 focus:border-spacing-10 focus:border-yellow-600 focus:outline-none"
            />
          </label>
          <label
            htmlFor="password-input-register"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            <input
              onChange={handleChangePassword}
              data-testid="common_register__input-password"
              id="password-input-register"
              type="password"
              placeholder="Senha"
              className="border-2 border-yellow-400 p-2 rounded-md w-full h-12 focus:border-spacing-10 focus:border-yellow-600 focus:outline-none"
            />
          </label>
          <button
            onClick={register}
            type="button"
            data-testid="common_register__button-register"
            disabled={isDisabled}
            className="bg-yellow-200 enabled:bg-yellow-500 text-white enabled:text-white font-bold py-2 px-4 rounded-full w-full h-12 enabled:hover:text-white  enabled:hover:scale-105 enabled:hover:bg-yellow-600 transition duration-300"
          >
            Cadastrar
          </button>
          <button
            type="button"
            data-testid="common_login__button-register"
            onClick={() => navigate("/login")}
            className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-full w-full h-12 hover:bg-yellow-600 hover:text-white  hover:scale-105 transition duration-300
            "
          >
            Voltar
          </button>
          {console.log(badRegister)}
          {badRegister && invalidRegisterMessage}
        </form>
      </section>
      <Footer />
    </main>
  );
}

export default Register;
