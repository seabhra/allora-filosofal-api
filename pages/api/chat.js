// api/chat.js
import cors from 'cors';
import { createCors, error } from 'micro';

// Configuração CORS manual (ou use micro-cors se preferir)
const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  return await fn(req, res);
};

const handler = async (req, res) => {
  if (req.url === '/api/hello' && req.method === 'GET') {
    return res.json({ message: 'Olá, API está funcionando!' });
  }

  if (req.url.startsWith('/api/chat') && req.method === 'POST') {
    try {
      let body = '';
      for await (const chunk of req) {
        body += chunk.toString();
      }
      const data = JSON.parse(body);
      const { pergunta } = data;

      if (!pergunta) {
        return res.statusCode = 400, res.json({ error: 'Pergunta não fornecida' });
      }

      const resposta = `Resposta gerada para: ${pergunta}`;
      return res.json({ resposta });
    } catch (err) {
      console.error('Erro em /api/chat:', err);
      res.statusCode = 500;
      return res.json({ error: 'Erro interno no servidor' });
    }
  }

  // Rota não encontrada
  res.statusCode = 404;
  return res.json({ error: 'Rota não encontrada' });
};

export default allowCors(handler);


