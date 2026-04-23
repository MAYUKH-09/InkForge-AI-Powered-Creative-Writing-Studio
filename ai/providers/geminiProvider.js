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

    let retries = 7;
    let delay = 1500;
    let currentModel = this._model;

    while (retries > 0) {
      try {
        const response = await client.models.generateContent({
          model: currentModel,
          contents: userPrompt,
          config: {
            systemInstruction: systemPrompt,
            temperature,
            maxOutputTokens,
          }
        });

        return {
          content: response.text,
          model: currentModel,
          tokens: response.usageMetadata?.totalTokenCount || 0,
        };
      } catch (error) {
        const isQuotaError = error.message && error.message.includes('429');
        const isLimitZero = isQuotaError && error.message.includes('limit: 0');
        
        const isRetryableError = !isLimitZero && error.message && (
          error.message.includes('503') || 
          error.message.includes('UNAVAILABLE') || 
          isQuotaError || 
          error.message.includes('ResourceExhausted')
        );

        if (isRetryableError) {
          retries--;
          console.warn(`[GeminiProvider] Warning with ${currentModel} at ${delay}ms... (${retries} retries left) - ${error.message.split('\\n')[0].substring(0, 80)}`);
          
          if (retries === 0) {
             throw error; 
          }

          if (retries === 4 && currentModel === 'gemini-2.5-flash') {
            console.warn(`[GeminiProvider] Falling back to gemini-2.0-flash due to sustained issues.`);
            currentModel = 'gemini-2.0-flash';
          } else if (retries === 2 && currentModel === 'gemini-2.0-flash') {
            console.warn(`[GeminiProvider] Falling back to gemini-2.5-flash-lite due to sustained issues.`);
            currentModel = 'gemini-2.5-flash-lite';
          }

          if (retries > 0) {
             await new Promise(resolve => setTimeout(resolve, delay));
             delay = Math.min(delay * 1.5, 10000); // Backoff, max 10s
          }
        } else {
          // If we hit a limit:0 or other non-retryable error on the first/second attempt,
          // try to immediately fallback if we haven't reached the lite model yet
          if (isLimitZero && currentModel !== 'gemini-2.5-flash-lite') {
             console.warn(`[GeminiProvider] Hit limit 0 on ${currentModel}, instantly falling back.`);
             if (currentModel === 'gemini-2.5-flash') currentModel = 'gemini-2.0-flash';
             else if (currentModel === 'gemini-2.0-flash') currentModel = 'gemini-2.5-flash-lite';
             retries--;
             continue; // Immediately try the next model without sleeping
          }
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
