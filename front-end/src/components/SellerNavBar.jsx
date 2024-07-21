import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SellerNavBar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-neutral-800 fixed w-full z-20 h-auto top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex items-center justify-between px-5 py-5 mx-auto sm:h-20 md:h-24 lg:h-30">
        <div className="flex items-start">
          <img
            src={require("../images/icone.png")}
            className="h-11 w-auto mr-3 mt-1"
            alt="icone de usuario"
          />
          <p className="self-center text-white text- font-semibold whitespace-nowrap dark:text-white">
            Olá, {user.name}
            <a
              href="/seller/orders"
              className="block pr-4 text-yellow-500 rounded hover:scale-105 md:p-0 hover:text-yellow-600"
            >
              Pedidos
            </a>
          </p>
        </div>
        <div className="relative text-gray-600 w-full hidden sm:hidden md:block lg:block mx-20 focus-within:text-gray-400">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="submit"
              className="p-1 focus:outline-none focus:shadow-outline"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </span>
          <input
            type="search"
            name="q"
            className="py-2 text-sm text-gray-600 w-full h-12 bg-white rounded-md pl-10 focus:outline-none"
            placeholder="Pesquise sua bebida favorita..."
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col items-end h-11">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            className={`md:block  ${menuOpen ? "block" : "hidden"}`}
            id="navbar-sticky"
          >
            <div className="relative z-10 sm:flex sm:items-start bg-neutral-700 rounded py-2 mt-2 md:py-0 md:mt-0 sm:bg-neutral-700 sm:rounded md:bg-neutral-800  md:rounded">
              <p className="self-center text-white font-semibold whitespace-nowrap dark:text-white">
                <a
                  href="/"
                  data-testid="customer_products__element-navbar-link-logout"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                  }}
                  className="block  h-6 pl-3 pr-4 text-yellow-500 rounded hover:text-yellow-600 hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 hover:scale-105"
                >
                  Sair
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative  text-gray-600 sm:block items-center mb-4 md:hidden mx-6 focus-within:text-gray-400">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <button
            type="submit"
            className="p-1 focus:outline-none focus:shadow-outline"
          >
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </span>
        <input
          type="search"
          name="q"
          className="py-2 text-sm text-gray-600 w-full h-12 bg-white rounded-md pl-10 focus:outline-none"
          placeholder="Pesquise sua bebida favorita..."
          autoComplete="off"
        />
      </div>
    </nav>
  );
}

export default SellerNavBar;
