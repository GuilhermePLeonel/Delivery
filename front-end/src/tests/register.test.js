/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Register from "./../pages/Register";
import { requestCreate } from "../services/requests";

jest.mock("../services/requests");

describe("Register Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Renderiza o formulário de Registro", () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    expect(
      screen.getByTestId("common_register__input-name")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("common_register__input-email")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("common_register__input-password")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("common_register__button-register")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("common_login__button-register")
    ).toBeInTheDocument();
  });

  it("Habilita ou desabilita o botão de registro conforme os campos preenchidos", async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    const nameInput = screen.getByTestId("common_register__input-name");
    const emailInput = screen.getByTestId("common_register__input-email");
    const passwordInput = screen.getByTestId("common_register__input-password");
    const registerButton = screen.getByTestId(
      "common_register__button-register"
    );

    expect(registerButton).toBeDisabled();

    fireEvent.change(nameInput, { target: { value: "User Tester One" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(registerButton).not.toBeDisabled();
  });

  it("Sucesso ao fazer o registro", async () => {
    const mockUser = {
      name: "Test User One",
      email: "test@example.com",
      password: "password123",
    };

    const mockApiResponse = {
      data: mockUser,
      status: 201,
    };

    requestCreate.mockResolvedValue(mockApiResponse);

    jest.useFakeTimers();

    render(
      <Router>
        <Register />
      </Router>
    );

    const nameInput = screen.getByTestId("common_register__input-name");
    const emailInput = screen.getByTestId("common_register__input-email");
    const passwordInput = screen.getByTestId("common_register__input-password");
    const registerButton = screen.getByTestId(
      "common_register__button-register"
    );

    fireEvent.change(nameInput, { target: { value: mockUser.name } });
    fireEvent.change(emailInput, { target: { value: mockUser.email } });
    fireEvent.change(passwordInput, { target: { value: mockUser.password } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(requestCreate).toHaveBeenCalledWith({
        name: mockUser.name,
        email: mockUser.email,
        password: mockUser.password,
      });
    });

    await waitFor(() => {
      expect(localStorage.getItem("user")).toBe(JSON.stringify(mockUser));
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    jest.useRealTimers();

    await waitFor(() => {
      expect(window.location.pathname).toBe("/customer/products");
    });
  });

  it("Redireciona para a página de login ao clicar no botão 'Voltar'", () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    const backButton = screen.getByTestId("common_login__button-register");

    act(() => {
      fireEvent.click(backButton);
    });

    expect(window.location.pathname).toBe("/login");
  });

  it("Teste de responsividade em desktop e mobile", () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    const nameInput = screen.getByTestId("common_register__input-name");
    const emailInput = screen.getByTestId("common_register__input-email");
    const passwordInput = screen.getByTestId("common_register__input-password");
    const registerButton = screen.getByTestId(
      "common_register__button-register"
    );
    const backButton = screen.getByTestId("common_login__button-register");

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();

    window.innerWidth = 360;
    window.dispatchEvent(new Event("resize"));

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();

    window.innerWidth = 1024;
    window.dispatchEvent(new Event("resize"));

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
  });

  it("Erro ao fazer o registro", async () => {
    const mockUser = {
      name: "Test User One",
      email: "aaaaaaaaaa@gmail.com",
      password: "password123",
    };

    const mockApiResponse = {
      data: mockUser,
      status: 409,
    };

    jest.useFakeTimers();

    requestCreate.mockResolvedValue(mockApiResponse);

    render(
      <Router>
        <Register />
      </Router>
    );

    const nameInput = screen.getByTestId("common_register__input-name");
    const emailInput = screen.getByTestId("common_register__input-email");
    const passwordInput = screen.getByTestId("common_register__input-password");
    const registerButton = screen.getByTestId(
      "common_register__button-register"
    );

    fireEvent.change(nameInput, { target: { value: mockUser.name } });
    fireEvent.change(emailInput, { target: { value: mockUser.email } });
    fireEvent.change(passwordInput, { target: { value: mockUser.password } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText("Dados inválidos")).toBeInTheDocument();
    });
  });
});
