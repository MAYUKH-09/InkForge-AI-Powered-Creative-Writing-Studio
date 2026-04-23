const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: "invalid" });
async function test() {
  try {
    await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "test"
    });
  } catch (err) {
    console.log("message:", err.message);
    console.log("status:", err.status);
    console.log("code:", (err.error && err.error.code) || 'none');
    console.log("err obj:", err);
  }
}
test();
