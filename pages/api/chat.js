
  
export default async function handler(req, res) {
	const { pergunta } = req.body;
	const resposta = "Resposta da IA para: " + pergunta;
	res.status(200).json({ resposta });
  }
