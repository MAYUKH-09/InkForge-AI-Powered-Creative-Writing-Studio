/**
 * OpenAI Provider
 * Implements BaseProvider for OpenAI GPT models.
 * Handles lazy client initialization and token tracking.
 */

const BaseProvider = require('./base');

class OpenAIProvider extends BaseProvider {
  constructor(config = {}) {
    super('OpenAI');
    this._client = null;
    this._apiKey = config.apiKey || process.env.OPENAI_API_KEY;
    this._model = config.model || process.env.OPENAI_MODEL || 'gpt-4o-mini';
  }

  /**
   * Lazy-initialize the OpenAI client.
   * @returns {Object} OpenAI client instance
   */
  _getClient() {
    if (!this._client) {
      const OpenAI = require('openai');
      this._client = new OpenAI({ apiKey: this._apiKey });
    }
    return this._client;
  }

  /**
   * Check if an API key is configured and valid-looking.
   * @returns {boolean}
   */
  isAvailable() {
    return !!(
      this._apiKey &&
      this._apiKey.length > 10 &&
      this._apiKey !== 'your_openai_api_key_here'
    );
  }

  /**
   * Generate content using OpenAI Chat Completions API.
   */
  async generate(systemPrompt, userPrompt, options = {}) {
    const client = this._getClient();
    const temperature = options.temperature ?? 0.8;
    const maxTokens = options.maxTokens ?? 4000;

    const response = await client.chat.completions.create({
      model: this._model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: maxTokens,
      temperature,
    });

    return {
      content: response.choices[0].message.content,
      model: response.model,
      tokens: response.usage?.total_tokens || 0,
    };
  }

  getInfo() {
    return {
      name: this.name,
      mode: 'openai',
      model: this._model,
    };
  }
}

module.exports = OpenAIProvider;
