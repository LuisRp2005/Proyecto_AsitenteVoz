const chatContainer = document.getElementById('chat-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const voiceButton = document.getElementById('voice-button');

// Diccionario de respuestas
const botResponses = {
    "hola": "¡Hola! ¿En qué puedo ayudarte?",
    "cómo estás": "Estoy aquí para ayudarte, ¿qué necesitas?",
    "adiós": "¡Hasta luego! Cuídate.",
    "qué es javascript": "JavaScript es un lenguaje de programación usado principalmente en la web para crear páginas interactivas.",
    "gracias": "¡De nada! Estoy para ayudarte."
};

// Función para buscar respuesta
function getBotResponse(userMessage) {
    userMessage = userMessage.toLowerCase();
    for (const keyword in botResponses) {
        if (userMessage.includes(keyword)) {
            return botResponses[keyword];
        }
    }
    return "Lo siento, no entiendo esa pregunta.";
}

// Función para que el bot lea el texto en voz alta
function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES'; // Configura el idioma a español
    speechSynthesis.speak(utterance);
}

// Enviar mensaje
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        addMessage(message, 'user');
        const botReply = getBotResponse(message);
        addMessage(botReply, 'bot');
        speakText(botReply); // Llama a la función para que el bot lea la respuesta
        messageInput.value = '';
    }
});

// Agregar mensaje al chat
function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.textContent = message;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Reconocimiento de voz
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'es-ES';
recognition.continuous = false;

voiceButton.addEventListener('click', () => {
    recognition.start();
});

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    messageInput.value = transcript;
};

recognition.onerror = (event) => {
    console.error('Error de reconocimiento de voz:', event.error);
};
