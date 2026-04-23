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
    this._model = config.model || process.env.GEMINI_MODEL || 'gemini-1.5-flash-latest';
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
        const errorMessage = error.message || '';
        const isQuotaError = errorMessage.includes('429') || errorMessage.includes('ResourceExhausted');
        const isLimitZero = isQuotaError && errorMessage.includes('limit: 0');
        const isNotFoundError = errorMessage.includes('404') || errorMessage.includes('not found');
        
        const isRetryableError = !isLimitZero && (
          errorMessage.includes('503') || 
          errorMessage.includes('UNAVAILABLE') || 
          isQuotaError ||
          isNotFoundError // Handle 404 as fallback candidate
        );

        if (isRetryableError) {
          retries--;
          console.warn(`[GeminiProvider] Warning with ${currentModel} at ${delay}ms... (${retries} retries left) - ${errorMessage.split('\n')[0].substring(0, 80)}`);
          
          if (retries === 0) {
             throw error; 
          }

          // Aggressive fallback for Quota OR Not Found errors
          if ((isQuotaError && retries <= 3) || isNotFoundError) {
            if (currentModel.includes('flash')) {
              console.warn(`[GeminiProvider] Switching from Flash to Pro fallback...`);
              currentModel = 'gemini-1.5-pro-latest';
            } else if (currentModel.includes('pro')) {
              console.warn(`[GeminiProvider] Pro failed, trying experimental flash-2.0...`);
              currentModel = 'gemini-2.0-flash-exp';
            }
          }

          // Don't wait for 404 errors, try next model immediately
          if (!isNotFoundError) {
            await new Promise(resolve => setTimeout(resolve, delay));
            delay = Math.min(delay * 2, 15000); 
          }
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
