const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;  // Port where the server will run

// OpenAI API Key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
    console.error("Error: OPENAI_API_KEY is missing. Please set it in the .env file.");
    process.exit(1); // Exit if the API key is not provided
} else {
    console.log("OpenAI API Key loaded successfully.");
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the public folder
app.use(express.static('public'));

// API Endpoint for Chat Completions
app.post('/api/completions', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is missing in the request body." });
        }

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 100, // Adjust token limit as needed
                temperature: 0.7, // Adjust creativity level as needed
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                },
            }
        );

        if (!response.data || !response.data.choices || !response.data.choices[0]) {
            throw new Error("Unexpected response format from OpenAI API.");
        }

        // Send the AI's response back to the client
        res.json({ message: response.data.choices[0].message.content });
    } catch (error) {
        console.error(
            'Error communicating with OpenAI:',
            error.response ? error.response.data : error.message
        );

        if (error.response && error.response.status === 401) {
            res.status(401).json({ error: "Invalid API key." });
        } else {
            res.status(500).json({ error: "Something went wrong on the server." });
        }
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
