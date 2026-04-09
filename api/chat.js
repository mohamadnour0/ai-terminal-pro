export default async function handler(req, res) {
    // التأكد من أن الطلب من نوع POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { messages } = req.body;

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
        
        // إرسال البيانات للمتصفح كما هي
        return res.status(200).json(data);

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
