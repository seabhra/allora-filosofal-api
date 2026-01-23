const express = require('express');
const cors = require('cors');
const app = express();

// Configure o CORS para aceitar requisições de qualquer origem
app.use(cors({
  origin: '*', // Permite qualquer origem (para desenvolvimento)
  methods: ['GET', 'POST', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
}));

app.use(express.json());

// Rota para receber a pergunta e gerar a resposta
app.post('/api/chat', (req, res) => {
  const { pergunta } = req.body;

  if (!pergunta) {
    return res.status(400).json({ error: 'Pergunta não fornecida' });
  }

  // Lógica para gerar a resposta
  const resposta = `Resposta gerada para: ${pergunta}`;

  res.json({ resposta });
});

// Rota de teste
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Olá, API está funcionando!' });
});

module.exports = app;
