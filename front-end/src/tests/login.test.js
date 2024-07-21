import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./../pages/Login";
import { requestLogin } from "../services/requests";

jest.mock("../services/requests");

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Renderiza o formulário de Login", () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    expect(screen.getByTestId("common_login__input-email")).toBeInTheDocument();
    expect(
      screen.getByTestId("common_login__input-password")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("common_login__button-login")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("common_login__button-register")
    ).toBeInTheDocument();
  });

  it("Sucesso ao fazer o login como Admin", async () => {
    const mockAdminUser = {
      email: "adm@deliveryapp.com",
      name: "Delivery App Admin",
      role: "administrator",
      token: "a4c86edecc5aee06eff8fdeda69e0d04",
    };

    requestLogin.mockResolvedValue(mockAdminUser);

    render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = screen.getByTestId("common_login__input-email");
    const passwordInput = screen.getByTestId("common_login__input-password");
    const loginButton = screen.getByTestId("common_login__button-login");

    fireEvent.change(emailInput, { target: { value: mockAdminUser.email } });
    fireEvent.change(passwordInput, { target: { value: "--adm2@21!!--" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(requestLogin).toHaveBeenCalledWith(
        emailInput.value,
        passwordInput.value
      );
    }).then(() => {
      expect(localStorage.getItem("user")).toBe(JSON.stringify(mockAdminUser));
    });
  });

  it("Sucesso ao fazer o login como Seller", async () => {
    const mockSellerUser = {
      email: "fulana@deliveryapp.com",
      name: "Fulana Pereira",
      role: "seller",
      token: "3c28d2b0881bf46457a853e0b07531c6",
    };

    requestLogin.mockResolvedValue(mockSellerUser);

    render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = screen.getByTestId("common_login__input-email");
    const passwordInput = screen.getByTestId("common_login__input-password");
    const loginButton = screen.getByTestId("common_login__button-login");

    fireEvent.change(emailInput, { target: { value: mockSellerUser.email } });
    fireEvent.change(passwordInput, { target: { value: "fulana@123" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(requestLogin).toHaveBeenCalledWith(
        emailInput.value,
        passwordInput.value
      );
    }).then(() => {
      expect(localStorage.getItem("user")).toBe(JSON.stringify(mockSellerUser));
    });
  });

  it("Sucesso ao fazer o login como Customer", async () => {
    const mockCustomerUser = {
      email: "zebirita@email.com",
      name: "Cliente Zé Birita",
      role: "customer",
      token: "1c37466c159755ce1fa181bd247cb925",
    };

    requestLogin.mockResolvedValue(mockCustomerUser);

    render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = screen.getByTestId("common_login__input-email");
    const passwordInput = screen.getByTestId("common_login__input-password");
    const loginButton = screen.getByTestId("common_login__button-login");

    fireEvent.change(emailInput, { target: { value: mockCustomerUser.email } });
    fireEvent.change(passwordInput, { target: { value: "$#zebirita#$" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(requestLogin).toHaveBeenCalledWith(
        emailInput.value,
        passwordInput.value
      );
    }).then(() => {
      expect(localStorage.getItem("user")).toBe(
        JSON.stringify(mockCustomerUser)
      );
    });
  });

  it("Mostra mensagens de erro caso o login não tenha sucesso", async () => {
    requestLogin.mockRejectedValue(new Error("Failed to login"));

    render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = screen.getByTestId("common_login__input-email");
    const passwordInput = screen.getByTestId("common_login__input-password");
    const loginButton = screen.getByTestId("common_login__button-login");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(
        screen.getByTestId("common_login__element-invalid-email")
      ).toBeInTheDocument();
    });
  });
  it("Habilita ou desabilita o botão de login conforme os campos preenchidos", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = screen.getByTestId("common_login__input-email");
    const passwordInput = screen.getByTestId("common_login__input-password");
    const loginButton = screen.getByTestId("common_login__button-login");

    expect(loginButton).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(loginButton).not.toBeDisabled();
  });

  it("Altera a rota após um login bem-sucedido", async () => {
    const mockSellerUser = {
      email: "fulana@deliveryapp.com",
      name: "Fulana Pereira",
      role: "seller",
      token: "3c28d2b0881bf46457a853e0b07531c6",
    };

    requestLogin.mockResolvedValue(mockSellerUser);

    render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = screen.getByTestId("common_login__input-email");
    const passwordInput = screen.getByTestId("common_login__input-password");
    const loginButton = screen.getByTestId("common_login__button-login");

    fireEvent.change(emailInput, { target: { value: mockSellerUser.email } });
    fireEvent.change(passwordInput, { target: { value: "fulana@123" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/seller/orders");
    });
  });

  it("Teste de responsividade em desktop e mobile", () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = screen.getByTestId("common_login__input-email");
    const passwordInput = screen.getByTestId("common_login__input-password");
    const loginButton = screen.getByTestId("common_login__button-login");
    const registerButton = screen.getByTestId("common_login__button-register");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();

    window.innerWidth = 360;
    window.dispatchEvent(new Event("resize"));

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();

    window.innerWidth = 1024;
    window.dispatchEvent(new Event("resize"));

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });
});
