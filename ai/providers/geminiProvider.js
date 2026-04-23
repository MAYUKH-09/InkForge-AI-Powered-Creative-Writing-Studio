/**
 * Gemini Provider
 * Implements BaseProvider for Google's Gemini models.
 * Handles client initialization via @google/genai.
 */

const BaseProvider = require('./base');

class GeminiProvider extends BaseProvider {
  constructor(config = {}) {
    super('Gemini');
    this._client = null;
    this._apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY;
    this._model = config.model || process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  }

  /**
   * Lazy-initialize the Gemini client.
   * @returns {Object} GoogleGenAI client instance
   */
  _getClient() {
    if (!this._client) {
      const { GoogleGenAI } = require('@google/genai');
      this._client = new GoogleGenAI({ apiKey: this._apiKey });
    }
    return this._client;
  }

  /**
   * Check if an API key is configured.
   * @returns {boolean}
   */
  isAvailable() {
    return !!(this._apiKey && this._apiKey.length > 5);
  }

  /**
   * Generate content using Gemini API.
   */
  async generate(systemPrompt, userPrompt, options = {}) {
    const client = this._getClient();
    const temperature = options.temperature ?? 0.8;
    const maxOutputTokens = options.maxTokens ?? 1000;

    let retries = 3;
    let delay = 1000;

    while (retries > 0) {
      try {
        const response = await client.models.generateContent({
          model: this._model,
          contents: userPrompt,
          config: {
            systemInstruction: systemPrompt,
            temperature,
            maxOutputTokens,
          }
        });

        return {
          content: response.text,
          model: this._model,
          tokens: response.usageMetadata?.totalTokenCount || 0,
        };
      } catch (error) {
        if (error.message && (error.message.includes('503') || error.message.includes('UNAVAILABLE'))) {
          retries--;
          if (retries === 0) throw error;
          console.warn(`[GeminiProvider] 503 High Demand Error. Retrying in ${delay}ms... (${retries} retries left)`);
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2;
        } else {
          throw error;
        }
      }
    }
  }

  getInfo() {
    return {
      name: this.name,
      mode: 'gemini',
      model: this._model,
    };
  }
}

module.exports = GeminiProvider;
