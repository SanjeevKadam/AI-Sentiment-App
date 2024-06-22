const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send("Here")
})

app.post('/analyze', async (req, res) => {
    const text = req.body.text;

    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
            { inputs: text },
            {
                headers: {
                    Authorization: `Bearer YOUR_HUGGING_FACE_API_KEY`,
                },
            }
        );

        const result = response.data;
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error analyzing sentiment' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
