require("dotenv").config();

const environment = process.env.NODE_ENV || "production";

const suffix = {
  prod: "",
  production: "",
  dev: "-dev",
  development: "-dev",
  test: "-test",
};
// comment 
const options = {
  host:  "localhost",
  port: process.env.MYSQL_PORT || "5432",
  database: `${process.env.MYSQL_DB_NAME || "delivery-app"}${
    suffix[environment]
  }`,
  username: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "root",
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
