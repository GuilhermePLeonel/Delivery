require("dotenv").config();

const environment = process.env.NODE_ENV; /* || "production" */

const suffix = {
  prod: "",
  production: "",
  dev: "-dev",
  development: "-dev",
  test: "-test",
};

const options = {
  host: process.env.HOSTNAME /* "localhost" */,
  port: process.env.POSTGRES_PORT /* || "5432" */,
  database: `${process.env.POSTGRES_DB_NAME /*||  "app-delivery" */}${
    suffix[environment]
  }`,
  username: process.env.POSTGRES_USER /* || "guilherme" */,
  password: process.env.POSTGRES_PASSWORD /*  || "password" */,
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
