const express = require('express');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
app.use(express.json());

// Verificar que la API key está cargada
console.log('API Key loaded:', process.env.OPENAI_API_KEY ? 'Yes' : 'No');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Endpoint de prueba simple
app.get('/test', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Endpoint para ChatGPT
app.post('/chat', async (req, res) => {
    try {
        console.log('Received chat request:', req.body);
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: req.body.message }],
        });
        console.log('OpenAI response received');
        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        console.error('Error in chat endpoint:', error);
        if (error.message.includes('429')) {
            res.status(429).json({ 
                error: 'API quota exceeded. Please check your OpenAI account.',
                details: 'Visit platform.openai.com/account/billing to add credits.'
            });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

// Endpoint para DALL-E
app.post('/generate-image', async (req, res) => {
    try {
        console.log('Received image generation request:', req.body);
        const image = await openai.images.generate({
            prompt: req.body.prompt,
            n: 1,
            size: "1024x1024",
        });
        console.log('Image generated successfully');
        res.json({ imageUrl: image.data[0].url });
    } catch (error) {
        console.error('Error in image generation:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3333;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log('Endpoints disponibles:');
    console.log('- GET  /test');
    console.log('- POST /chat');
    console.log('- POST /generate-image');
});