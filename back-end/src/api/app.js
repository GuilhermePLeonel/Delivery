const express = require("express");
const cors = require("cors");
const routes = require("../routers/index");

const app = express();
app.use(cors());

app.use(express.json());
app.get("/", (_req, res) => res.status(418).end());
app.use(routes);

module.exports = app;
