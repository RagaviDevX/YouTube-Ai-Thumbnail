function getGroq() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Groq = require("groq-sdk").default
  return new Groq({ apiKey: process.env.GROQ_API_KEY || "placeholder" })
}

export async function generateTitles(topic: string, niche: string, tone: string): Promise<string[]> {
  const groq = getGroq()
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: `You are a viral YouTube title expert. Generate exactly 10 high-CTR YouTube titles. Return ONLY a JSON array of 10 strings. No explanation, no markdown. Niche: ${niche}. Tone: ${tone}.` },
      { role: "user", content: `Topic: ${topic}` },
    ],
    max_tokens: 1024,
    temperature: 0.8,
  })
  const text = completion.choices[0]?.message?.content || "[]"
  try {
    const parsed = JSON.parse(text.trim())
    return Array.isArray(parsed) ? parsed : []
  } catch {
    const matches = text.match(/"([^"]+)"/g)
    return matches ? matches.map((m: string) => m.replace(/"/g, "")).slice(0, 10) : []
  }
}

export async function generateHooks(topic: string, style: string, length: string): Promise<{ type: string; hook: string; retention: number }[]> {
  const groq = getGroq()
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: `You are a YouTube retention expert. Generate 4 video hooks. Return ONLY a JSON array with objects: type (string), hook (string), retention (number 60-95). Hook types: Question, Shocking Stat, Story, Controversy. Length: ${length}.` },
      { role: "user", content: `Topic: ${topic}. Hook style: ${style}` },
    ],
    max_tokens: 1024,
    temperature: 0.7,
  })
  const text = completion.choices[0]?.message?.content || "[]"
  try { return JSON.parse(text.trim()) } catch { return [] }
}

export async function generateThumbnailIdeas(prompt: string, style: string, niche: string): Promise<{ title: string; description: string; gradient: string }[]> {
  const groq = getGroq()
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: `You are a YouTube thumbnail design expert. Generate 4 thumbnail concepts. Return ONLY a JSON array with objects: title (string, <60 chars), description (string, <120 chars), gradient (CSS like "135deg, #1e1b4b, #4c1d95"). Style: ${style}. Niche: ${niche}. No markdown.` },
      { role: "user", content: prompt },
    ],
    max_tokens: 800,
    temperature: 0.9,
  })
  const text = completion.choices[0]?.message?.content || "[]"
  try { return JSON.parse(text.trim()) } catch { return [] }
}
