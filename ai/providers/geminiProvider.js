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
    this._model = config.model || process.env.GEMINI_MODEL || 'gemini-1.5-flash';
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

    let retries = 5;
    let delay = 2000;
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
        const isQuotaError = error.message && (error.message.includes('429') || error.message.includes('ResourceExhausted'));
        const isLimitZero = isQuotaError && error.message.includes('limit: 0');
        
        const isRetryableError = !isLimitZero && error.message && (
          error.message.includes('503') || 
          error.message.includes('UNAVAILABLE') || 
          isQuotaError
        );

        if (isRetryableError) {
          retries--;
          console.warn(`[GeminiProvider] Warning with ${currentModel} at ${delay}ms... (${retries} retries left) - ${error.message.split('\n')[0].substring(0, 80)}`);
          
          if (retries === 0) {
             throw error; 
          }

          // More aggressive fallback for Quota errors
          if (isQuotaError && retries <= 3) {
            if (currentModel === 'gemini-1.5-flash') {
              console.warn(`[GeminiProvider] 429 on Flash. Attempting gemini-1.5-pro fallback...`);
              currentModel = 'gemini-1.5-pro';
            } else if (currentModel === 'gemini-1.5-pro') {
              console.warn(`[GeminiProvider] 429 on Pro. Trying gemini-2.0-flash-exp...`);
              currentModel = 'gemini-2.0-flash-exp';
            }
          }

          await new Promise(resolve => setTimeout(resolve, delay));
          delay = Math.min(delay * 2, 15000); // Exponential backoff, max 15s
        } else {
          // Instantly fallback if we hit a hard limit 0
          if (isLimitZero && currentModel === 'gemini-1.5-flash') {
             console.warn(`[GeminiProvider] Hit limit 0 on Flash, instantly falling back to Pro.`);
             currentModel = 'gemini-1.5-pro';
             retries--;
             continue;
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
