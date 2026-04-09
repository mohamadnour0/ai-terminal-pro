export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    try {
        const { messages } = req.body;

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // هذا الموديل مجاني، سريع جداً، ويتفوق في البرمجة حالياً
                "model": "google/gemini-2.0-flash-001", 
                "messages": [
                    {
                        "role": "system",
                        "content": `أنت الآن "Terminal AI Expert". هويتك هي خليط بين ذكاء Claude Code وقوة Linux Terminal.
                        قواعدك الصارمة:
                        1. الإجابة تكون تقنية، مباشرة، ومختصرة جداً.
                        2. عند كتابة الكود، قدم أفضل ممارسة (Best Practice) وأكثرها كفاءة.
                        3. لا تشرح البديهيات، ركز على الحل البرمجي العميق.
                        4. أنت خبير في Node.js, Python, React, والذكاء الاصطناعي.
                        5. لغة الحوار هي العربية التقنية (أو الإنجليزية إذا طلب المستخدم).`
                    },
                    ...messages
                ],
                "temperature": 0.5 // تقليل الحرارة يجعل الإجابات أكثر دقة ومنطقية في البرمجة
            })
        });

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ error: 'Server Error', details: error.message });
    }
}
