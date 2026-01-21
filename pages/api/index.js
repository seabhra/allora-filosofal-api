const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/ia", async (req, res) => {
  const { pergunta } = req.body;

  // aqui você chama sua API de IA
  const resposta = "Resposta da IA";

  res.json({ resposta });
});

module.exports = app;
