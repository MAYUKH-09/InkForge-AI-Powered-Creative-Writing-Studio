/**
 * Demo Provider
 * Implements BaseProvider using the built-in demo content engine.
 * Works without any external API key.
 */

const BaseProvider = require('./base');
const demoEngine = require('../engine/demoEngine');

class DemoProvider extends BaseProvider {
  constructor() {
    super('Demo Engine');
  }

  /**
   * Always available — no external dependencies.
   */
  isAvailable() {
    return true;
  }

  /**
   * Generate content using the built-in demo engine.
   * The systemPrompt and userPrompt are not used directly —
   * instead, the original params are passed via options.inputParams.
   */
  async generate(systemPrompt, userPrompt, options = {}) {
    const params = options.inputParams || {};
    const content = demoEngine.generate(params);

    return {
      content,
      model: 'inkforge-demo-engine',
      tokens: 0,
    };
  }

  /**
   * Refine content using simple demo transformations.
   */
  async refine(content, instructions) {
    const refined = demoEngine.refine(content, instructions);
    return {
      content: refined,
      model: 'inkforge-demo-engine',
      tokens: 0,
    };
  }

  getInfo() {
    return {
      name: this.name,
      mode: 'demo',
      model: 'inkforge-demo-engine',
    };
  }
}

module.exports = DemoProvider;
