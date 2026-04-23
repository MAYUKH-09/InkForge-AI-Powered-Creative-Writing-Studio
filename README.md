# 🖋️ InkForge — AI-Powered Creative Writing Studio

A full-stack web application that empowers users to **generate**, **refine**, **preview**, and **export** high-quality creative content using AI.

![InkForge Screenshot](https://img.shields.io/badge/Status-Production%20Ready-brightgreen) ![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB) ![Node](https://img.shields.io/badge/Backend-Express.js-339933) ![AI](https://img.shields.io/badge/AI-OpenAI%20GPT-412991)

---

## ✨ Features

- **🎯 Multi-Format Content Generation** — Stories, Essays, Poems, Scripts, Articles
- **🎨 8 Writing Styles** — Formal, Casual, Fantasy, Academic, Journalistic, Poetic, Technical, Humorous
- **🎭 8 Tone Options** — Professional, Friendly, Dramatic, Mysterious, Inspirational, Dark, Whimsical, Reflective
- **✏️ Live Editor** — Edit generated content directly in the workspace
- **🔄 AI Refinement** — Refine content with natural language instructions
- **📊 Content Analytics** — Word count, reading time, readability score, vocabulary richness
- **📤 Multi-Format Export** — Download as PDF, DOCX, or TXT
- **🌙 Premium Dark Theme** — Glassmorphism design with gradient accents
- **🤖 Dual Mode** — Works out of the box with built-in Demo Engine; switches to OpenAI GPT when API key is provided
- **📱 Fully Responsive** — Three-panel desktop layout that collapses to mobile

---

## 🚀 Deployment (GitHub & Vercel)

If you have exported this code to GitHub and deployed it on Vercel, you must manually configure your API key for it to work:

1.  **Vercel Dashboard**: Go to your project settings -> **Environment Variables**.
2.  **Add Key**: Add a new variable:
    *   **Name**: `GEMINI_API_KEY`
    *   **Value**: Your actual Google AI Studio API Key.
3.  **Redeploy**: Go to the **Deployments** tab and redeploy your latest commit.

### Why is this needed?
- **Security**: API keys are intentionally kept private. When you export to GitHub, we do not include your keys for safety.
- **AI Engine Detection**: The app looks for `GEMINI_API_KEY` in the environment. If it's missing, it automatically falls back to the **Demo Engine** to prevent a crash.
- **Demo Mode**: If you see "Demo Engine Active" on your website, it means the key is missing or invalid in your Vercel settings.

---

## 🤖 AI Modes (Updated)

### Gemini AI Mode (Production)
The preferred mode. Uses `gemini-flash-latest` for high-quality, creative content that strictly follows your ideas, word counts, and instructions.

### Demo Engine (Fallback)
A sophisticated built-in generator that works without an API key. 
- **Improved Relevance**: I have recently updated the Demo Engine to intelligently weave your "Idea" into every generated piece (Story, Essay, Poem, etc.).
- **Dynamic Templates**: Even if your API key is missing, the fallback content will now reflect your input instead of generic templates.

---

## 📁 Project Structure

```
Creative Writing 2/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── generate.js        # POST /api/generate-content
│   │   │   ├── refine.js          # POST /api/refine-content
│   │   │   └── export.js          # POST /api/export
│   │   ├── services/
│   │   │   ├── openaiService.js   # GPT API wrapper + demo fallback
│   │   │   ├── promptBuilder.js   # Constructs prompts from input
│   │   │   ├── contentOptimizer.js# Readability & content analysis
│   │   │   └── demoEngine.js      # Built-in content generator
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   └── app.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── InputForm.jsx
│   │   │   ├── StyleSelector.jsx
│   │   │   ├── ContentEditor.jsx
│   │   │   ├── PreviewPanel.jsx
│   │   │   ├── ExportBar.jsx
│   │   │   ├── LoadingOverlay.jsx
│   │   │   └── Toast.jsx
│   │   ├── hooks/
│   │   │   └── useApi.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/generate-content` | Generate new creative content |
| POST | `/api/refine-content` | Refine existing content with instructions |
| POST | `/api/export` | Export content as PDF, DOCX, or TXT |
| GET | `/api/health` | Health check & mode detection |

### Generate Content — Request Body
```json
{
  "idea": "A mysterious traveler discovers an ancient library",
  "contentType": "story",
  "genre": "Fantasy",
  "tone": "mysterious",
  "style": "formal",
  "characters": "Elena, The Keeper",
  "keywords": "magic, secrets, discovery"
}
```

### Refine Content — Request Body
```json
{
  "content": "Your existing content here...",
  "instructions": "Make it more dramatic and add more dialogue"
}
```

### Export — Request Body
```json
{
  "content": "Content to export...",
  "format": "pdf",
  "title": "My Story Title"
}
```

---

## 🔐 Security

- API keys are stored in `.env` files (never committed to version control)
- All AI API calls are made from the **backend only**
- API keys are **never exposed** to the frontend
- The `.env` file is included in `.gitignore`

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite 5 |
| Styling | Vanilla CSS (glassmorphism, gradients) |
| Backend | Node.js + Express |
| AI | OpenAI GPT API (optional) |
| PDF Export | PDFKit |
| DOCX Export | docx |
| Typography | Inter + Playfair Display + JetBrains Mono |

---

## 📝 License

MIT License — feel free to use, modify, and distribute.
