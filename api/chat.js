
// api/chat.js - VERSÃO 3 Allora Filosofal

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// 1. Configurações de Middlewares
app.use(cors());
app.use(express.json()); // Para entender o JSON enviado no body da requisição

// 2. Servir arquivos estáticos (Corrige o erro ERR_FILE_NOT_FOUND)
// Isso diz ao Express: "Os arquivos HTML, CSS e JS estão na pasta public"
app.use(express.static(path.join(__dirname, '../public')));

// 3. Rota da API (A sua lógica original entra aqui)
app.post('/api/chat', async (req, res) => {
    // ==========================================
    // SEUS HEADERS CORS MANUAIS (Mantidos)
    // ==========================================
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Apenas POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Pega os dados do body
        const { model, messages, temperature, max_tokens } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'messages é obrigatório' });
        }

        console.log('📥 Requisição recebida:', messages.length, 'mensagens');

        // Chamada à API Groq
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Pega a chave do arquivo .env
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: model || 'llama-3.3-70b-versatile',
                messages: messages,
                temperature: temperature || 0.7,
                max_tokens: max_tokens || 1500
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('❌ Erro Groq:', error);
            return res.status(response.status).json(error);
        }

        const data = await response.json();
        console.log('✅ Resposta enviada');
        return res.status(200).json(data);

    } catch (error) {
        console.error('❌ Erro:', error.message);
        return res.status(500).json({ error: error.message });
    }
});

// 4. Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
    console.log(`📂 Frontend disponível em http://localhost:${PORT}/index.html`);
});



