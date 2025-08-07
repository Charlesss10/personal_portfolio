import pdfParse from 'pdf-parse';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const limiter = new RateLimiterMemory({ points: 5, duration: 60 });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messageHistory } = req.body;
  const query = messageHistory[messageHistory.length - 1]?.content || '';

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  try {
    await limiter.consume(ip);
  } catch {
    return res.status(429).json({ error: 'Too many requests. Please slow down.' });
  }

  // Extract text from PDF
  const pdfUrl = `https://${req.headers.host}/cv_eboson_charles.pdf`;
  console.log('Fetching PDF from:', pdfUrl);
  const response = await fetch(pdfUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch PDF from public directory');
  }
  const buffer = await response.arrayBuffer();
  const { text } = await pdfParse(Buffer.from(buffer));

  // Split into sentences
  const sentences = text.match(/[^.!?\n]+[.!?\n]/g)?.map(s => s.trim()) || [];

  // Find relevant chunks
  const keywords = query.toLowerCase().split(/\s+/);
  const matchedChunks = sentences.filter(s =>
    keywords.some(k => s.toLowerCase().includes(k))
  ).slice(0, 6);

  const context = matchedChunks.join(' ');

  const systemPrompt = {
    role: 'system',
    content: `Use the following information about Charles Eboson to answer the user's question:\n\n${context}`
  };

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [systemPrompt, ...messageHistory],
        max_tokens: 150
      })
    });

    const data = await response.json();
    return res.status(200).json({ reply: data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'OpenAI API error' });
  }
}
