require("dotenv").config();

const environment = process.env.NODE_ENV;

const suffix = {
  prod: "",
  production: "",
  dev: "-dev",
  development: "-dev",
  test: "-test",
};

const options = {
  host: process.env.HOSTNAME,
  port: process.env.POSTGRES_PORT,
  database: `${process.env.POSTGRES_DB_NAME}${suffix[environment]}`,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
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
