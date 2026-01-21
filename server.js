const express = require('express');
const cors = require('cors');
const app = express();

// Habilita o CORS para todas as rotas
app.use(cors());

// Suas rotas aqui...
app.get('/api/chat', (req, res) => {
    res.json({ message: "API funcionando!" });
});

// Inicia o servidor
app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});