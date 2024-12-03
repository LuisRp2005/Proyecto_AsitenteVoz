const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

// Configuración para servir archivos estáticos
app.use(express.static(__dirname));

// Servir el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'AsistenteVozV2.0.html'));
});

// Define la ruta para el endpoint de conversación
app.post('/ask', (req, res) => {
    const userMessage = req.body.message;
    if (!userMessage) {
        return res.status(400).json({ error: 'No se recibió mensaje del usuario.' });
    }
    const botReply = getBotResponse(userMessage);
    res.json({ reply: botReply });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));

function getBotResponse(userMessage) {
    const botResponses = {
        "hola": "¡Hola! ¿En qué puedo ayudarte?",
        "cómo estás": "Estoy aquí para ayudarte, ¿qué necesitas?",
        "adiós": "¡Hasta luego! Cuídate.",
        "qué es javascript": "JavaScript es un lenguaje de programación usado principalmente en la web para crear páginas interactivas.",
        "gracias": "¡De nada! Estoy para ayudarte."
    };
    userMessage = userMessage.toLowerCase();
    for (const keyword in botResponses) {
        if (userMessage.includes(keyword)) {
            return botResponses[keyword];
        }
    }
    return "Lo siento, no entiendo esa pregunta.";
}
