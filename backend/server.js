const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Get your key from https://console.groq.com/keys
const GROQ_API_KEY = process.env.GROQ_API_KEY || 'YOUR_GROQ_API_KEY_HERE';

app.use(cors());
app.use(bodyParser.json());

app.post('/analyze', async (req, res) => {
    const { topic } = req.body;
    if (!topic) return res.status(400).json({ error: 'Topic is required' });

    try {
        const prompt = `Given the topic "${topic}", brainstorm 5 product ideas with 5 keywords each, plus 3 general keywords. Output strictly as JSON with keys: "products_services" (list of {name, keywords}) and "general_keywords" (list of strings).`;

        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: "You are a helpful assistant that only outputs valid JSON." },
                    { role: "user", content: prompt }
                ],
                response_format: { type: "json_object" }
            },
            {
                headers: {
                    'Authorization': `Bearer ${GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Groq stores the result in choices[0].message.content
        const aiRawResponse = response.data.choices[0].message.content;
        const aiResult = JSON.parse(aiRawResponse);
        
        // Manual enrichment
        aiResult.backlink_opportunity_types = ["Guest Post Blogs", "Industry Forums", "Review Sites"];

        res.json(aiResult);

    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        res.status(500).json({ error: 'AI processing failed' });
    }
});

app.get('/', (req, res) => {
    res.send('Server is up and running! Ready to analyze topics.');
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
