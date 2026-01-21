// api/chat.js
export default function handler(req, res) {
	// Configura os cabeçalhos CORS
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
	if (req.method === 'POST') {
	  const { pergunta } = req.body;
	  const resposta = `Resposta da IA para: ${pergunta}`;
	  res.status(200).json({ resposta });
	} else if (req.method === 'OPTIONS') {
	  res.status(200).end();
	} else {
	  res.status(405).json({ error: "Método não permitido" });
	}
  }
  