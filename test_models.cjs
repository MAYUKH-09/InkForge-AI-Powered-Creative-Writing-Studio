const { GoogleGenAI } = require('@google/genai');

const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

async function test() {
  try {
    const response = await ai.models.list();
    for await (const m of response) {
        console.log(m.name);
    }
  } catch (err) {
    console.log("err:", err.message);
  }
}
test();
