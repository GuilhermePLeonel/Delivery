import React from 'react';

function AdminNavBar() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <nav>
      <ul>
        <li>
          <a
            href="/admin/manage"
            data-testid="customer_products__element-navbar-link-products"
          >
            GERENCIAR USUÁRIOS
          </a>
        </li>
        <li />
        <li>
          <p
            data-testid="customer_products__element-navbar-user-full-name"
          >
            { user }
          </p>
        </li>
        <li>
          <a
            href="/"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => localStorage.clear() }
          >
            SAIR
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default AdminNavBar;
