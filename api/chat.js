export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(450).json({ error: 'Method not allowed' });
    }

    const { messages } = req.body;

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "model": "qwen/qwen-2.5-72b-instruct",
                "messages": messages
            })
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch from OpenRouter' });
    }
}
