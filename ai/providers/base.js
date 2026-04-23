/**
 * Base AI Provider — Abstract Interface
 * All AI providers must implement this contract.
 * Enables swapping providers (OpenAI, Claude, Gemini, local LLM)
 * without changing any business logic.
 */

class BaseProvider {
  constructor(name) {
    if (new.target === BaseProvider) {
      throw new Error('BaseProvider is abstract and cannot be instantiated directly.');
    }
    this.name = name;
  }

  /**
   * Generate content from a constructed prompt.
   * @param {string} systemPrompt - System role message
   * @param {string} userPrompt - User prompt
   * @param {Object} options - { temperature, maxTokens }
   * @returns {Promise<{ content: string, model: string, tokens: number }>}
   */
  async generate(systemPrompt, userPrompt, options = {}) {
    throw new Error(`${this.name}.generate() not implemented`);
  }

  /**
   * Check if this provider is available and configured.
   * @returns {boolean}
   */
  isAvailable() {
    throw new Error(`${this.name}.isAvailable() not implemented`);
  }

  /**
   * Get provider metadata.
   * @returns {{ name: string, mode: string, model: string }}
   */
  getInfo() {
    return { name: this.name, mode: 'unknown', model: 'unknown' };
  }
}

module.exports = BaseProvider;
