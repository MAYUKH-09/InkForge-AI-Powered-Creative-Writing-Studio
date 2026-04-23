/**
 * Demo Content Generation Engine
 * A sophisticated built-in content generator that produces quality creative content
 * without requiring any external API key. Uses templates, vocabulary banks,
 * and structural patterns to generate contextually relevant content.
 */

// ─── Vocabulary Banks ──────────────────────────────────────────────────────────

const OPENINGS = {
  story: [
    (p) => `The first thing ${p.protagonist} noticed about the ${p.setting} was the ${p.lightType}. This was the place where ${p.idea} finally found its voice.`,
    (p) => `It began with ${p.protagonist} realizing that ${p.idea} was more than a myth. It was a ${p.weather} reality unfolding in the ${p.setting}.`,
    (p) => `Three things ${p.protagonist} knew for certain: the ${p.setting} was no longer safe, the quest for ${p.idea} was just beginning, and the ${p.object} in ${p.possessive} pocket was the key to everything.`,
    (p) => `${p.protagonist} had always believed that ${p.idea} was better left unexplored. But the ${p.setting} standing before ${p.pronoun} now told a different story.`,
  ],
  essay: [
    (p) => `In the grand tapestry of ${p.idea}, few threads are as vital — or as overlooked — as the one we are about to examine.`,
    (p) => `Consider this: Is ${p.idea} merely a concept, or is it a fundamental shift in our understanding of ${p.theme}?`,
  ],
  poem: [
    (p) => `Beneath the ${p.celestialBody}'s gaze,\nwhere ${p.naturalElement} meets ${p.idea},\nI found a truth wrapped in ${p.abstractNoun} —`,
  ],
  script: [
    (p) => `FADE IN:\n\nEXT. ${p.setting.toUpperCase()} - ${p.timeOfDay.toUpperCase()}\n\nThe camera pans across the ${p.landscape}. We hear the distant sound of ${p.ambientSound}.\n\n${p.protagonist.toUpperCase()} stands at the edge, thinking of ${p.idea.toUpperCase()}.`,
  ],
  article: [
    (p) => `Is ${p.idea} reshaping the way we think about ${p.relatedTopic}? According to recent developments in ${p.theme}, the answer is a resounding yes.`,
  ],
};

const MIDDLES = {
  story: [
    (p) => `\n\nAs ${p.protagonist} ventured deeper into the ${p.setting}, the reality of ${p.idea} began to crystallize. The ${p.object} wasn't just an artifact — it was a compass, pointing toward the ${p.abstractNoun} that had been stolen from ${p.pronoun} long ago.\n\n"${p.idea} is the answer," ${p.protagonist} murmured. The inscriptions glowed faintly in the ${p.lightType}.\n\nThe ${p.setting} shifted. Each turn revealed murals of ${p.historical}, of triumphs and catastrophes. And there, in a chamber vast enough to hold the sky, ${p.protagonist} found evidence of ${p.idea}'s true power.`,
    (p) => `\n\nHours passed like sand. ${p.protagonist} lost track of time. The quest for ${p.idea} brought new revelations and deeper questions.\n\nThe ${p.secondaryCharacter} appeared without warning. "${p.idea} requires courage," ${p.secondaryCharacter} said. ${p.protagonist} studied ${p.pronoun2} carefully. Together, they navigated the labyrinth of ${p.abstractNoun}. "We're close," ${p.secondaryCharacter} whispered.`,
  ],
  essay: [
    (p) => `\n\n## The Evolution of ${p.idea}\n\nTo understand ${p.idea}, we must first examine its roots. The concept emerged from ${p.origin}, evolving through centuries of thought.\n\nToday, ${p.idea} manifests in ways that would astonish its earliest proponents. ${p.modernExample}. The data tells a compelling story: ${p.statistic}.`,
  ],
  poem: [
    (p) => `\nAnd in the ${p.timeOfDay}, when ${p.naturalElement}\nI trace the outline of ${p.idea}\nacross the ${p.landscape} of my palms.\n\nWe were ${p.gemstone}s once,\npolished by the ${p.naturalElement} of ${p.emotion}.`,
  ],
  script: [
    (p) => `\n${p.protagonist.toUpperCase()}\n(${p.emotion})\n"${p.idea}" is only the beginning.\n\n${p.secondaryCharacter.toUpperCase()} steps forward. "${p.idea}" is the end, too.`,
  ],
  article: [
    (p) => `\n\n## Why ${p.idea} Matters\n\nThe transformation didn't happen overnight. For years, ${p.idea} operated on the fringes. but a series of catalysts pushed it forward.\n\n"${p.quote}" explains one industry leader, capturing the essence of ${p.idea}.`,
  ],
};

const ENDINGS = {
  story: [
    (p) => `\n\n${p.protagonist} stood at the threshold of ${p.idea}. The ${p.object} was warm in ${p.possessive} hands. "${p.idea} is finally real," ${p.protagonist} whispered.\n\nAnd with a single step forward, ${p.pronoun} crossed into a world reborn — carrying the ${p.abstractNoun} of ${p.idea} forever.`,
  ],
  essay: [
    (p) => `\n\n## Conclusion\n\nUltimately, ${p.idea} is the defining challenge of our time. By embracing the ${p.abstractNoun2} of ${p.idea}, we can build a more ${p.emotion} future.`,
  ],
  poem: [
    (p) => `\nSo let the ${p.naturalElement} carry\nwhat the ${p.celestialBody} cannot hold —\nthis ${p.idea}, this trembling ${p.emotion},\nthis light we made\nfrom the stars.`,
  ],
  script: [
    (p) => `\n${p.protagonist.toUpperCase()} stops. Turns. The ${p.lightType} catches ${p.possessive} face — exhausted, determined, transformed.\n\n${p.protagonist.toUpperCase()}\n(quietly)\n"I finally understand ${p.idea} now."\n\n${p.secondaryCharacter.toUpperCase()} nods. No words needed.\n\nThe camera pulls back slowly, revealing the vast ${p.landscape} stretching to the horizon. Two figures, small against the immensity of the world, walking forward together.`,
  ],
  article: [
    (p) => `\n\n## Looking Ahead\n\n${p.idea} is not a passing trend — it's a fundamental evolution. As ${p.statistic}, the trajectory is clear.\n\nThe future belongs to those who understand that ${p.keyTakeaway}. And that future is already here with ${p.idea}.`,
  ],
};

// ─── Parameter Generators ──────────────────────────────────────────────────────

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateParams(input) {
  const protagonist = input.characters
    ? input.characters.split(',')[0].trim()
    : pick(['Elena', 'Marcus', 'Aria', 'Theo', 'Zara', 'Kai', 'Isolde', 'Roman', 'Luna', 'Orion']);

  const secondaryCharacter = input.characters && input.characters.includes(',')
    ? input.characters.split(',')[1].trim()
    : pick(['The Stranger', 'The Guide', 'Maven', 'Sage', 'The Keeper', 'Ember']);

  const isFemale = ['Elena', 'Aria', 'Zara', 'Isolde', 'Luna', 'she', 'her'].some(
    n => protagonist.toLowerCase().includes(n.toLowerCase())
  );

  const theme = input.keywords || input.idea || 'the nature of truth and discovery';
  const genre = input.genre || 'literary fiction';

  return {
    protagonist,
    secondaryCharacter,
    pronoun: isFemale ? 'she' : 'they',
    possessive: isFemale ? 'her' : 'their',
    pronoun2: pick(['they', 'she', 'he']),
    possessive2: pick(['their', 'her', 'his']),
    timeOfDay: pick(['morning', 'twilight', 'midnight', 'golden hour', 'dusk', 'dawn']),
    weather: pick(['misty', 'rain-washed', 'sun-drenched', 'frost-laden', 'storm-charged', 'clear']),
    setting: pick(['ancient library', 'forgotten garden', 'crumbling cathedral', 'moonlit forest',
      'desert temple', 'underground chamber', 'clifftop observatory', 'abandoned theater',
      'floating city', 'subterranean lake']),
    landscape: pick(['horizon', 'valley', 'mountain range', 'coastline', 'canopy', 'desert expanse']),
    object: pick(['amulet', 'compass', 'manuscript', 'crystal', 'key', 'lantern', 'mirror', 'journal']),
    sensory: pick(['wild jasmine', 'ancient cedar', 'sea salt', 'woodsmoke', 'petrichor', 'lavender']),
    sensoryPlural: pick(['whispered echoes', 'scattered petals', 'crystallized memories', 'woven silences']),
    lightType: pick(['amber light', 'silver moonlight', 'golden sunlight', 'phosphorescent glow', 'candlelight']),
    beverage: pick(['coffee', 'tea', 'wine', 'elderflower cordial']),
    naturalElement: pick(['wind', 'river', 'rain', 'mist', 'ocean', 'starlight', 'snow']),
    celestialBody: pick(['moon', 'sun', 'stars', 'aurora']),
    creature: pick(['sparrow', 'wolf', 'firefly', 'raven', 'butterfly', 'fox', 'owl']),
    season: pick(['autumn', 'winter', 'spring', 'solstice']),
    gemstone: pick(['amber', 'sapphire', 'opal', 'emerald', 'moonstone', 'quartz']),
    abstractNoun: pick(['truth', 'memory', 'courage', 'wonder', 'resilience', 'longing', 'hope']),
    abstractNoun2: pick(['silence', 'forgiveness', 'destiny', 'freedom', 'belonging', 'passion']),
    emotion: pick(['determination', 'tenderness', 'fierce hope', 'quiet resolve', 'raw vulnerability']),
    ambientSound: pick(['distant thunder', 'wind chimes', 'a violin', 'crashing waves', 'birdsong']),
    discovery: pick([
      'a mirror that showed not reflections, but possibilities — infinite versions of the life that could still be',
      'a vast mural painted across the ceiling, depicting the story of every soul who had ever dared to seek the truth',
      'a garden growing in impossible light, each flower a crystallized memory from a different lifetime',
    ]),
    dialogue1: pick([
      'I didn\'t come this far to turn back now',
      'The truth was here all along — I just wasn\'t ready to see it',
      'Every ending is just a beginning wearing a different mask',
      'Some things you can\'t understand until you let go of everything you thought you knew',
    ]),
    dialogue2: pick([
      'You\'re closer than you think. But the final door requires something no one can carry for you',
      'I\'ve been waiting. Not for anyone — for you, specifically',
      'The path chooses the traveler, not the other way around',
    ]),
    closingDialogue: pick([
      'Every story ends. But the best ones echo forever',
      'I know now. I\'ve always known — I just needed the courage to believe it',
      'Home isn\'t a place. It\'s the moment you stop running from yourself',
    ]),
    theme,
    relatedTopic: pick(['human potential', 'social change', 'creative innovation', 'cultural evolution']),
    thesis: `This exploration reveals that ${theme} fundamentally reshapes our understanding of what is possible.`,
    hookQuestion: `What if everything we thought we knew about ${theme} was only the beginning of a much larger story?`,
    origin: pick(['ancient philosophical traditions', 'the intersection of science and art', 'centuries of cultural evolution']),
    quote: `"The most profound changes begin not with revolution, but with a single question asked at the right moment."`,
    argument1: `the evidence increasingly suggests that embracing ${theme} leads to richer, more nuanced outcomes`,
    counterArgument: `there are legitimate concerns about unintended consequences that deserve careful consideration`,
    modernExample: `the rapid evolution of digital culture, shifting global paradigms, and grassroots movements`,
    statistic: `over 70% of professionals in the field report a fundamental shift in approach over the past decade`,
    criticism: `the potential for oversimplification or misapplication`,
    rebuttal: `the benefits, when properly understood, far outweigh the risks — provided we approach with both ambition and caution`,
    humanActivity: pick(['create', 'connect', 'communicate', 'innovate', 'collaborate']),
    recommendation: `a balanced approach that combines critical thinking with creative experimentation`,
    practicalAdvice: `Start by questioning your assumptions. Then seek out perspectives that challenge your own. The most valuable insights often come from the most unexpected sources.`,
    keyTakeaway: `adaptability and empathy are not just virtues — they are survival skills for the modern era`,
    headline: input.idea ? input.idea.charAt(0).toUpperCase() + input.idea.slice(1) : 'The Future Is Being Written Now',
    historical: pick(['ancient empires rising from dust', 'explorers charting unknown seas', 'revolutions born of whispered dreams']),
    genre,
  };
}

// ─── Generator ─────────────────────────────────────────────────────────────────

function generate(input) {
  const type = input.contentType || 'story';
  const params = generateParams(input);

  const openings = OPENINGS[type] || OPENINGS.story;
  const middles = MIDDLES[type] || MIDDLES.story;
  const endings = ENDINGS[type] || ENDINGS.story;

  const opening = pick(openings)(params);
  
  // Smart middle generation based on word limit
  let bodySections = [];
  const requestedWords = input.wordLimit ? parseInt(input.wordLimit, 10) : 300;
  
  // Each middle section is roughly 150-200 words
  const sectionsNeeded = Math.max(1, Math.min(6, Math.ceil(requestedWords / 150)));
  
  for (let i = 0; i < sectionsNeeded; i++) {
    // Try to pick unique middles if possible, otherwise repeat
    bodySections.push(pick(middles)(params));
  }
  
  const body = opening + bodySections.join('\n\n') + pick(endings)(params);
  const title = generateTitle(input, params, type);

  return `TITLE: ${title}\nCONTENT: ${body}`;
}

function generateTitle(input, params, type) {
  if (input.idea && input.idea.length < 60) {
    // Create a title from the idea
    const words = input.idea.split(' ');
    if (words.length <= 6) return input.idea.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  const titles = {
    story: [
      `The ${params.object.charAt(0).toUpperCase() + params.object.slice(1)} of ${params.setting.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`,
      `Where the ${params.naturalElement.charAt(0).toUpperCase() + params.naturalElement.slice(1)} Remembers`,
      `${params.protagonist}: A Tale of ${params.abstractNoun.charAt(0).toUpperCase() + params.abstractNoun.slice(1)}`,
    ],
    essay: [
      `On the Nature of ${params.theme.charAt(0).toUpperCase() + params.theme.slice(1)}`,
      `${params.theme.charAt(0).toUpperCase() + params.theme.slice(1)}: A Critical Examination`,
    ],
    poem: [
      `${params.abstractNoun.charAt(0).toUpperCase() + params.abstractNoun.slice(1)} in ${params.season.charAt(0).toUpperCase() + params.season.slice(1)}`,
      `Ode to the ${params.naturalElement.charAt(0).toUpperCase() + params.naturalElement.slice(1)}`,
    ],
    script: [
      `${params.setting.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`,
      `The Last ${params.timeOfDay.charAt(0).toUpperCase() + params.timeOfDay.slice(1)}`,
    ],
    article: [`Understanding ${params.theme}`],
  };

  return pick(titles[type] || titles.story);
}

function refine(content, instructions) {
  // In demo mode, apply simple transformations
  let refined = content;

  if (instructions.toLowerCase().includes('shorter') || instructions.toLowerCase().includes('concise')) {
    const paragraphs = refined.split('\n\n');
    refined = paragraphs.filter((_, i) => i === 0 || i === paragraphs.length - 1 || i % 2 === 0).join('\n\n');
  }

  if (instructions.toLowerCase().includes('formal')) {
    refined = refined.replace(/\bdon't\b/g, 'do not');
    refined = refined.replace(/\bcan't\b/g, 'cannot');
    refined = refined.replace(/\bwon't\b/g, 'will not');
    refined = refined.replace(/\bit's\b/g, 'it is');
  }

  if (instructions.toLowerCase().includes('dramatic') || instructions.toLowerCase().includes('intense')) {
    refined = refined.replace(/\./g, (match, offset, str) => {
      if (Math.random() > 0.7 && str[offset - 1] !== '.') return '. ';
      return match;
    });
  }

  // Add a note about refinement
  refined += '\n\n---\n*Content refined based on your instructions. For advanced AI-powered refinement, add your OpenAI API key to the backend .env file.*';

  return refined;
}

module.exports = { generate, refine };
