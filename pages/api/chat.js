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

// Rota de teste
app.get('/api/hello', (req, res) => {
  try {
    res.json({ message: 'Olá, API está funcionando!' });
  } catch (error) {
    console.error("Erro em /api/hello:", error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// Rota principal para receber a pergunta
app.post('/api/chat', async (req, res) => {
  try {
    const { pergunta } = req.body;

    if (!pergunta) {
      return res.status(400).json({ error: 'Pergunta não fornecida' });
    }

    // Lógica para gerar a resposta (substitua com sua lógica real)
    const resposta = `Resposta gerada para: ${pergunta}`;

    res.json({ resposta });
  } catch (error) {
    console.error("Erro em /api/chat:", error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// Middleware para tratar rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

module.exports = app;
