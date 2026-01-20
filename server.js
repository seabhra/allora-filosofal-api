const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', (req, res) => {
    const { messages } = req.body;
    console.log("Mensagem recebida:", messages[0].content);
    res.json({
        choices: [{
            message: {
                content: "Resposta simulada da API: " + messages[0].content
            }
        }]
    });
});

app.listen(3001, () => {
    console.log('API rodando em http://localhost:3001');
});
