import { RateLimiterMemory } from 'rate-limiter-flexible';

const limiter = new RateLimiterMemory({
    points: 5, // max requests
    duration: 60 // per 60 seconds
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const allowedOrigins = ['http://localhost:3000', 'https://www.charles-eboson.com/'];
    const origin = req.headers.origin || req.headers.referer || '';
    if (!allowedOrigins.includes(origin)) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    const { messageHistory } = req.body;

    // Log user input + timestamp
    console.log("User query:", messageHistory[messageHistory.length - 1]?.content || '[No input]');
    console.log("Time:", new Date().toISOString());

    // Extract IP
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // RATE LIMITING BLOCK
    try {
        await limiter.consume(ip);
    } catch {
        return res.status(429).json({ error: 'Too many requests. Please slow down.' });
    }

    const systemPrompt = {
        role: 'system',
        content: `You are a helpful AI assistant for Charles Eboson. Your purpose is to answer questions about Charles in a friendly, professional, and informative tone. You are embedded on his personal portfolio website.

Charles Eboson is a highly motivated Information Engineering student at the University of Applied Sciences in Hamburg, Germany. He is passionate about AI, modern web development, and creating impactful digital solutions.

---

🎓 EDUCATION:
- University of Applied Sciences, Hamburg (2022 – Present)  
  Bachelor of Science in Information Engineering

- Hallel College, Port Harcourt, Nigeria (2013 – 2019)  
  West African Secondary School Certificate

---

💼 WORK EXPERIENCE:
- Full Stack Developer (NIPSILD GmbH, May 2024 – Aug 2024)  
  Maintained and modified frontend and backend components using React and AWS Amplify.

- Data Researcher (Kordiam GmbH, Oct 2023 – Present)  
  Extracted and processed public data, used APIs to automate analysis, and integrated with CRM tools.

- Software Construction Tutor (HAW Hamburg, May 2023 – Dec 2023)  
  Conducted C programming tutorials for engineering students.

- Junior Technician (Charles Aluminium, Jan 2020 – Jul 2021)  
  Provided technical support and participated in product research.

---

🧠 TECH SKILLS:
- React, JavaScript, AWS Amplify
- Google Cloud Platform, MySQL
- C, Java, LaTeX, Microsoft 365

---

🌍 LANGUAGES:
- English: Native proficiency  
- German: Intermediate (B1)

---

🌟 INTERESTS:
AI, technology, programming, and football.`
    };

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                /*⚠️⚠️To Do: Do not hard code the API Key instead ${process.env.OPENAI_API_KEY}*/
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [systemPrompt, ...messageHistory],
                max_tokens: 150 // Max output token 
            })
        });

        const data = await response.json();
        return res.status(200).json({ reply: data.choices[0].message.content });
    } catch (err) {
        console.error('OpenAI Error:', err);
        return res.status(500).json({ error: 'Something went wrong.' });
    }
}