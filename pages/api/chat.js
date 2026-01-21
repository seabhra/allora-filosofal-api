
export default async function handler(req, res) {
	if (req.method === 'POST') {
	  const { pergunta } = req.body;
	  const resposta = "Resposta da IA para: " + pergunta;
	  res.status(200).json({ resposta });
	} else {
	  res.status(405).json({ error: "Método não permitido" });
	}
  }
  