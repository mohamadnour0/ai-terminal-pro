export default async function handler(req, res) {
    // التأكد من أن الطلب المرسل هو POST فقط
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { messages } = req.body;

        // إعداد الاتصال مع OpenRouter
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://vercel.com', // متطلب اختياري لـ OpenRouter
            },
            body: JSON.stringify({
                // اختيار الموديل: يمكنك التبديل بين google/gemini-2.0-flash-001 أو anthropic/claude-3.5-sonnet
                "model": "google/gemini-2.0-flash-001", 
                "messages": [
                    {
                        "role": "system",
                        "content": "You are Claude Code, a highly specialized CLI-based AI engineer. Your persona is professional, concise, and technical. You provide expert-level code solutions, debug complex issues, and communicate in a way that fits a high-end terminal environment. Always prioritize accuracy and clean code."
                    },
                    ...messages
                ],
                "temperature": 0.7 // توازن بين الإبداع والدقة
            })
        });

        const data = await response.json();

        // إرجاع النتيجة للموقع
        return res.status(200).json(data);

    } catch (error) {
        console.error('Terminal API Error:', error);
        return res.status(500).json({ 
            error: 'Internal Server Error', 
            details: error.message 
        });
    }
}
