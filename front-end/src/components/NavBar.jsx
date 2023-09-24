import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <nav class="bg-neutral-800 fixed w-full z-20 h-auto top-0 left-0 border-b border-gray-200 dark:border-gray-600 ">
      <div class="max-w-screen-xl flex items-center  justify-between  px-5 py-5 mx-auto sm:h-20 md:h-24 lg:h-30">
        <div class="flex items-start">
          <img
            src="https://cdn.icon-icons.com/icons2/1161/PNG/512/1487716857-user_81635.png"
            class="h-11 w-auto mr-3 mt-1"
            alt="icone de usuario"
          />
          <p class="self-center text-white text- font-semibold whitespace-nowrap dark:text-white ">
            Olá, {user.name}
            <a
              href="/customer/orders"
              class="block pr-4 text-yellow-500 rounded hover:scale-105 md:p-0 hover:text-yellow-600"
            >
              Meus pedidos
            </a>
          </p>
        </div>
        <div class="relative text-gray-600 w-full hidden sm:hidden  md:block lg:block mx-20 focus-within:text-gray-400">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="submit"
              class="p-1 focus:outline-none focus:shadow-outline"
            >
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                class="w-6 h-6"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </span>
          <input
            type="search"
            name="q"
            class="py-2 text-sm text-gray-600 w-full h-12 bg-white rounded-md pl-10 focus:outline-none "
            placeholder="Pesquise sua bebida favorita..."
            autocomplete="off"
          />
        </div>
        <div class="flex flex-col items-end h-11">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            class={`md:block  ${menuOpen ? "block" : "hidden"}`}
            id="navbar-sticky"
          >
            <div
              class="relative z-10 sm:flex sm:items-start bg-neutral-700 rounded
            py-2 mt-2 md:py-0 md:mt-0 sm:bg-neutral-700 sm:rounded md:bg-neutral-800  md:rounded"
            >
              <p class="self-center  text-white font-semibold  whitespace-nowrap dark:text-white ">
                <a
                  href="/customer/products"
                  aria-current="page"
                  class="block h-6 pl-3 pr-4 text-white-500 rounded hover:bg-gray-100 hover:text-gray-400 md:hover:bg-transparent md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 hover:scale-105"
                >
                  Produtos
                </a>
                <a
                  href="/"
                  data-testid="customer_products__element-navbar-link-logout"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                  }}
                  class="block  h-6 pl-3 pr-4 text-yellow-500 rounded hover:text-yellow-600 hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 hover:scale-105"
                >
                  Sair
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="relative  text-gray-600 sm:block items-center mb-4 md:hidden mx-6 focus-within:text-gray-400">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <button
            type="submit"
            class="p-1 focus:outline-none focus:shadow-outline"
          >
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-6 h-6"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </span>
        <input
          type="search"
          name="q"
          class="py-2 text-sm text-gray-600 w-full h-12 bg-white rounded-md pl-10 focus:outline-none "
          placeholder="Pesquise sua bebida favorita..."
          autocomplete="off"
        />
      </div>
    </nav>
  );
}

export default NavBar;
