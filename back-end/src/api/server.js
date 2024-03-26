require("dotenv").config();

const port = process.env.PORT;
const app = require("./app");

app.listen(port);
console.log(`Api rodando na porta ${port}`);

/* require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3001;

const app = express();
app.use(cors());

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Olá, mundo!"); // Rota de exemplo
});

app.listen(port);
console.log(`Api rodando na porta ${port}`); */
