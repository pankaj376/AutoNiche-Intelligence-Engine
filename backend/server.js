const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch'); // Ensure you have node-fetch installed or use built-in fetch in Node 18+

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Configuration for n8n Integration
const N8N_SCRAPER_WEBHOOK = process.env.N8N_WEBHOOK_URL || 'YOUR_N8N_WEBHOOK_URL';

/**
 * FEATURE: Hybrid Intelligence Logic
 * This function triggers the n8n Scraper for Real-Time Trends.
 * If n8n is offline or the request fails, it returns null, 
 * allowing the server to fall back to standard AI generation.
 */
async function getRealTimeTrends(query) {
    if (!N8N_SCRAPER_WEBHOOK || N8N_SCRAPER_WEBHOOK === 'YOUR_N8N_WEBHOOK_URL') {
        return null;
    }
    try {
        const response = await fetch(N8N_SCRAPER_WEBHOOK, {
            method: 'POST',
            body: JSON.stringify({ q: query, action: 'get_trends' }),
            headers: { 'Content-Type': 'application/json' },
            timeout: 5000 // 5-second timeout to prevent UI lag
        });
        return await response.json();
    } catch (error) {
        console.error("⚠️ n8n Scraper offline. Falling back to internal AI logic...");
        return null;
    }
}

/**
 * POST /api/analyze
 * Main endpoint for niche discovery
 */
app.post('/api/analyze', async (req, res) => {
    const { category } = req.body;

    if (!category) {
        return res.status(400).json({ error: 'Category is required' });
    }

    try {
        // 1. Attempt to fetch real-time trends from n8n
        const realTimeData = await getRealTimeTrends(category);

        // 2. Prepare the AI Prompt
        // We inject real-time data if available to "prime" the AI
        const trendContext = realTimeData ? `Current trending topics: ${JSON.stringify(realTimeData)}` : "No real-time data available.";

        const prompt = `
            Analyze the niche: ${category}. 
            ${trendContext}
            Provide 5 highly profitable sub-niches in strict JSON format.
            Include: name, profitability_score (1-100), search_volume, competition (Low/Med/High), and monetization_ideas.
        `;

        // 3. Call Primary AI (Example using Groq/Gemini logic)
        // Note: Replace this with your specific Groq/Gemini SDK implementation
        const aiResponse = await callAIProvider(prompt); 

        res.json({
            source: realTimeData ? 'Hybrid (AI + Real-time Scraper)' : 'Internal AI Engine',
            data: aiResponse,
            trends: realTimeData
        });

    } catch (error) {
        res.status(500).json({ error: 'Analysis failed', details: error.message });
    }
});

// Mock AI Provider Function (Placeholder for your specific SDK logic)
async function callAIProvider(prompt) {
    // Your Groq or Gemini SDK call goes here
    return { message: "AI Analysis Complete", prompt_received: prompt };
}

app.listen(PORT, () => {
    console.log(`🚀 NicheLogic Server running on http://localhost:${PORT}`);
    console.log(`📡 n8n Integration Status: ${N8N_SCRAPER_WEBHOOK !== 'YOUR_N8N_WEBHOOK_URL' ? 'Active' : 'Pending Config'}`);
});
