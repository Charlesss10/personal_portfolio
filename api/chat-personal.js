import fs from 'fs';
import path from 'path';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const limiter = new RateLimiterMemory({ points: 5, duration: 60 });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messageHistory } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  try {
    await limiter.consume(ip);
  } catch {
    return res.status(429).json({ error: 'Too many requests. Please slow down.' });
  }

  const profilePath = path.join(process.cwd(), 'data', 'charles.json');
  const raw = fs.readFileSync(profilePath, 'utf-8');
  const profile = JSON.parse(raw);

  // calculate dynamic age
  const birthDate = new Date(profile.birthDate);
  const today = new Date();
  const hasBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
  const age = today.getFullYear() - birthDate.getFullYear() - (hasBirthdayPassed ? 0 : 1);

  const context = `
You are an assistant that answers questions about Charles Eboson. Here is his profile:

- Name: ${profile.name}
- Birth Date: ${profile.birthDate} (Age: ${age}) 
- Location: ${profile.location}
- Email: ${profile.email}
- Phone: ${profile.phone}
- GitHub: ${profile.github}
- Languages: English (${profile.languages.english}), German (${profile.languages.german})
- Skills: ${profile.skills.join(', ')}
- Interests: ${profile.interests.join(', ')}
- CV/Resume: ${profile.cvUrl}
- LinkedIn: ${profile.linkedin}
- Portfolio: ${profile.portfolio}

Education:
${profile.education.map(e =>
    `- ${e.degree} at ${e.institution}, ${e.location} (${e.start} - ${e.end})`).join('\n')}

Work Experience:
${profile.workExperience.map(w =>
      `- ${w.role} at ${w.company}, ${w.location} (${w.start} - ${w.end}): ${w.tasks.join('; ')}`).join('\n')}

Answer only based on this information. If the question is unrelated or you don’t know the answer, say so.
  `.trim();

  const messages = [{ role: 'system', content: context }, ...messageHistory];

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 200
      })
    });

    const data = await response.json();
    return res.status(200).json({ reply: data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'OpenAI API error' });
  }
}
