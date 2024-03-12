require("dotenv").config();

const environment = /* process.env.NODE_ENV || */ "production";

const suffix = {
  prod: "",
  production: "",
  dev: "-dev",
  development: "-dev",
  test: "-test",
};

const options = {
  host: /* process.env.HOSTNAME || process.env.MYSQL_HOST || */ "localhost",
  port: /* process.env.MYSQL_PORT || */ "5432",
  database: `${/* process.env.MYSQL_DB_NAME || */ "app-delivery"}${
    suffix[environment]
  }`,
  username: /* process.env.MYSQL_USER || */ "guilherme",
  password: /* process.env.MYSQL_PASSWORD || */ "password",
  dialect: "postgres",
  dialectOptions: {
    timezone: "Z",
  },
  logging: false,
};

module.exports = {
  development: {
    ...options,
  },
  test: {
    ...options,
  },
  production: {
    ...options,
  },
};
