const express = require('express');
const cors = require('cors');

const app = express();

// Configuração do CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Rota de teste (GET)
app.get('/', (req, res) => {
  try {
    res.json({ message: 'API rodando corretamente.' });
  } catch (error) {
    console.error("Erro no GET:", error);
    res.status(500).json({ error: 'Erro interno' });
  }
});

// Rota principal (POST)
app.post('/', async (req, res) => {
  try {
    const { pergunta } = req.body;

    if (!pergunta) {
      return res.status(400).json({ error: 'Pergunta não fornecida' });
    }

    // Lógica de resposta
    const resposta = `Você perguntou: ${pergunta}`;

    res.json({ resposta });
  } catch (error) {
    console.error("Erro no POST:", error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// Middleware 404
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Exportar o app diretamente (Vercel lida com isso)
module.exports = app;