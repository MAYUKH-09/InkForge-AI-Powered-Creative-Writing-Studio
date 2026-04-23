/**
 * Demo Content Generation Engine
 * A sophisticated built-in content generator that produces quality creative content
 * without requiring any external API key. Uses templates, vocabulary banks,
 * and structural patterns to generate contextually relevant content.
 */

// ─── Vocabulary Banks ──────────────────────────────────────────────────────────

const OPENINGS = {
  story: [
    (p) => `The ${p.timeOfDay} air hung heavy with the scent of ${p.sensory} as ${p.protagonist} stepped into the ${p.setting}. Nothing could have prepared ${p.pronoun} for what lay ahead.`,
    (p) => `It began, as most extraordinary things do, with an ordinary moment — ${p.protagonist} reaching for a cup of ${p.beverage} that would never reach ${p.possessive} lips.`,
    (p) => `Three things ${p.protagonist} knew for certain: the ${p.setting} was no longer safe, time was running thin, and the ${p.object} in ${p.possessive} pocket was the key to everything.`,
    (p) => `The letter arrived on a ${p.weather} ${p.timeOfDay}, tucked between the pages of a book ${p.protagonist} had never opened. Its words would change everything.`,
    (p) => `${p.protagonist} had always believed that some doors were better left closed. But the one standing before ${p.pronoun} now — ancient, carved with symbols that seemed to shift in the ${p.lightType} — was not one ${p.pronoun} could ignore.`,
  ],
  essay: [
    (p) => `In the grand tapestry of ${p.theme}, few threads are as vital — or as overlooked — as the one we are about to examine. ${p.thesis}`,
    (p) => `Consider this: ${p.hookQuestion} The answer, as we shall explore, lies at the intersection of ${p.theme} and human experience.`,
    (p) => `Throughout history, ${p.theme} has shaped civilizations, toppled empires, and redefined what it means to be human. Today, it demands our attention more than ever.`,
  ],
  poem: [
    (p) => `Beneath the ${p.celestialBody}'s gentle gaze,\nwhere ${p.naturalElement} meets the ${p.landscape},\nI found a truth wrapped in ${p.abstractNoun} —`,
    (p) => `Listen:\nthe ${p.naturalElement} speaks in tongues of ${p.abstractNoun},\neach syllable a ${p.gemstone} dissolving into ${p.timeOfDay}.`,
    (p) => `There is a place between ${p.abstractNoun} and ${p.abstractNoun2},\nwhere the ${p.naturalElement} pauses mid-breath\nand the world remembers what it was.`,
  ],
  script: [
    (p) => `FADE IN:\n\nEXT. ${p.setting.toUpperCase()} - ${p.timeOfDay.toUpperCase()}\n\nThe camera pans across a ${p.weather} ${p.landscape}. We hear the distant sound of ${p.ambientSound}.\n\n${p.protagonist.toUpperCase()} stands at the edge, gazing into the distance. A moment of stillness before the storm.`,
  ],
  article: [
    (p) => `${p.hookQuestion} According to recent developments, ${p.theme} is reshaping the way we think about ${p.relatedTopic}. Here's what you need to know.`,
    (p) => `The conversation around ${p.theme} has reached a tipping point. Experts are divided, the data is compelling, and the implications are far-reaching.`,
  ],
};

const MIDDLES = {
  story: [
    (p) => `\n\nAs ${p.protagonist} ventured deeper into the ${p.setting}, the reality of the situation began to crystallize. The ${p.object} wasn't just an artifact — it was a compass, pointing toward something ${p.protagonist} had spent a lifetime avoiding: the truth about ${p.possessive} own past.\n\n"${p.dialogue1}," ${p.protagonist} murmured, turning the ${p.object} over in ${p.possessive} hands. The inscriptions glowed faintly, responding to ${p.possessive} touch like a living thing.\n\nThe ${p.setting} shifted around ${p.pronoun}. Walls that had seemed solid moments ago now rippled like water, revealing corridors that shouldn't exist. Each one whispered promises — of power, of knowledge, of the ${p.abstractNoun} that had been stolen from ${p.pronoun} long ago.\n\n${p.protagonist} chose the corridor bathed in ${p.lightType}. Not because it seemed safest, but because the air there carried a familiar fragrance — ${p.sensory} — the scent of home, of memory, of everything ${p.pronoun} had been fighting to protect.\n\nThe passage narrowed. Then widened. And there, in a chamber vast enough to hold the sky, ${p.protagonist} found ${p.discovery}.`,
    (p) => `\n\nHours passed like sand through a broken hourglass — sometimes slow, sometimes in torrents. ${p.protagonist} lost track of the ${p.timeOfDay}s that blurred together, each one bringing new revelations and deeper questions.\n\nThe ${p.secondaryCharacter} appeared without warning, stepping from the shadows as if ${p.pronoun2} had been woven from them. "${p.dialogue2}," ${p.secondaryCharacter} said, ${p.possessive2} voice carrying the weight of centuries.\n\n${p.protagonist} studied ${p.pronoun2} carefully. Trust was a currency too expensive to spend carelessly in this ${p.setting}. But something in ${p.secondaryCharacter}'s eyes — a flicker of ${p.emotion}, perhaps, or the ghost of shared understanding — made ${p.protagonist} lower ${p.possessive} guard.\n\nTogether, they navigated the labyrinth of ${p.abstractNoun}. Each turn revealed murals painted in pigments that seemed to bleed with life: scenes of ${p.historical}, of triumphs and catastrophes, of a world that existed before memory had a name.\n\n"We're close," ${p.secondaryCharacter} whispered. And for the first time, ${p.protagonist} believed it.`,
  ],
  essay: [
    (p) => `\n\n## The Foundation\n\nTo understand ${p.theme}, we must first examine its roots. The concept emerged from ${p.origin}, evolving through centuries of thought, debate, and transformation.\n\nScholars have long argued that ${p.theme} represents more than a simple phenomenon — it is a mirror reflecting our collective aspirations and anxieties. As one prominent thinker noted, "${p.quote}"\n\nThe evidence supports a nuanced view. On one hand, ${p.argument1}. On the other, ${p.counterArgument}. This tension is not a weakness in our understanding but rather its defining strength.\n\n## The Modern Landscape\n\nToday, ${p.theme} manifests in ways that would astonish its earliest proponents. ${p.modernExample}\n\nThe data tells a compelling story: ${p.statistic}. These numbers represent not just trends but transformations — fundamental shifts in how we ${p.humanActivity}.\n\nCritics may point to ${p.criticism}, and they raise valid concerns. However, a closer examination reveals that ${p.rebuttal}. The path forward lies not in choosing sides but in synthesizing these perspectives into a more complete understanding.`,
  ],
  poem: [
    (p) => `\nAnd in the ${p.timeOfDay}, when ${p.naturalElement}\nfolds itself into origami ${p.creature}s,\nI trace the outline of your ${p.abstractNoun}\nacross the ${p.landscape} of my palms.\n\nWe were ${p.gemstone}s once,\npolished by the ${p.naturalElement} of ${p.emotion},\neach facet catching ${p.celestialBody}light\nuntil we learned to shine\nwithout permission.\n\nNow the ${p.season} arrives\nwith its cargo of ${p.sensoryPlural},\nand I am fluent\nin the language of ${p.abstractNoun2} —\n\neach word a ${p.creature}\nlanding on the ${p.naturalElement}\nof everything I meant to say.`,
  ],
  script: [
    (p) => `\n${p.protagonist.toUpperCase()}\n(${p.emotion})\n${p.dialogue1}\n\n${p.secondaryCharacter.toUpperCase()} steps forward, ${p.possessive2} expression unreadable.\n\n${p.secondaryCharacter.toUpperCase()}\n${p.dialogue2}\n\nA beat. The ${p.ambientSound} grows louder.\n\n${p.protagonist.toUpperCase()} turns sharply, eyes scanning the ${p.setting}. Something has changed — the air is thicker, the ${p.lightType} dimmer.\n\n${p.protagonist.toUpperCase()}\n(urgent)\nWe need to move. Now.\n\nThey exchange a glance — the kind that carries more weight than words. Then they run.\n\nEXT. ${p.setting.toUpperCase()} - CONTINUOUS\n\nThe ${p.landscape} stretches before them, vast and unforgiving. ${p.protagonist.toUpperCase()} and ${p.secondaryCharacter.toUpperCase()} race through the ${p.weather} ${p.timeOfDay}, their footsteps the only sound in a world holding its breath.`,
  ],
  article: [
    (p) => `\n\n## Understanding the Shift\n\nThe transformation didn't happen overnight. For years, ${p.theme} operated on the fringes, noticed only by specialists and early adopters. But a series of catalysts — ${p.modernExample} — propelled it into the mainstream.\n\n"${p.quote}" explains one industry leader, capturing the sentiment shared by many professionals in the field.\n\nThe implications are significant. ${p.argument1} Meanwhile, ${p.statistic} — a figure that underscores the urgency of the conversation.\n\n## What This Means For You\n\n${p.practicalAdvice}\n\nExperts recommend focusing on ${p.recommendation}. While the landscape continues to evolve, one thing remains clear: ${p.keyTakeaway}.`,
  ],
};

const ENDINGS = {
  story: [
    (p) => `\n\n${p.protagonist} stood at the threshold, the ${p.object} warm in ${p.possessive} hands, its glow now steady and sure. The ${p.setting} behind ${p.pronoun} had crumbled into memory, but what lay ahead was luminous with possibility.\n\n"${p.closingDialogue}," ${p.protagonist} whispered to no one and everyone at once.\n\nAnd with a single step forward, ${p.pronoun} crossed into a world reborn — carrying with ${p.pronoun} the ${p.abstractNoun} of all ${p.pronoun} had survived, and the unshakable certainty that some stories don't end.\n\nThey begin again.`,
    (p) => `\n\nThe ${p.timeOfDay} found ${p.protagonist} standing where it all started — the same ${p.setting}, the same ${p.sensory} on the breeze. But ${p.pronoun} was not the same.\n\nThe ${p.object} rested in a place of honor now, its purpose fulfilled, its secrets shared. And though the world would never know the full weight of what ${p.protagonist} had carried, that was alright.\n\nSome truths are too vast for words. They live instead in the spaces between heartbeats, in the ${p.lightType} that filters through the ${p.naturalElement}, in the quiet knowledge that courage is not the absence of fear.\n\nIt is the decision to take one more step.\n\nAnd ${p.protagonist} had taken enough steps to last a lifetime — and enough to know that the journey, beautifully and impossibly, was just beginning.`,
  ],
  essay: [
    (p) => `\n\n## Conclusion\n\nAs we have seen, ${p.theme} is neither as simple as its advocates suggest nor as dangerous as its critics fear. It is, like most profound elements of human experience, a paradox — simultaneously challenging and enriching our understanding of ${p.relatedTopic}.\n\nThe path forward requires ${p.recommendation}. It demands that we move beyond binary thinking and embrace the complexity that makes ${p.theme} so vital.\n\nIn the end, the question is not whether ${p.theme} will shape our future — it already is. The question is whether we will shape it with wisdom, empathy, and the courage to see beyond our comfortable certainties.\n\nThe answer, as always, is in our hands.`,
  ],
  poem: [
    (p) => `\nSo let the ${p.naturalElement} carry\nwhat the ${p.celestialBody} cannot hold —\nthis ${p.abstractNoun}, this trembling ${p.emotion},\nthis light we made\nfrom darkness\nand the stubborn faith\nthat even silence\nsings.`,
  ],
  script: [
    (p) => `\n${p.protagonist.toUpperCase()} stops. Turns. The ${p.lightType} catches ${p.possessive} face — exhausted, determined, transformed.\n\n${p.protagonist.toUpperCase()}\n(quietly)\n${p.closingDialogue}\n\n${p.secondaryCharacter.toUpperCase()} nods. No words needed.\n\nThe camera pulls back slowly, revealing the vast ${p.landscape} stretching to the horizon. Two figures, small against the immensity of the world, walking forward together.\n\nThe ${p.ambientSound} fades to silence.\n\nSMASH CUT TO BLACK.\n\nTHE END`,
  ],
  article: [
    (p) => `\n\n## Looking Ahead\n\n${p.theme} is not a passing trend — it's a fundamental evolution. As ${p.statistic}, the trajectory is clear.\n\nFor those willing to engage with ${p.theme} thoughtfully and proactively, the opportunities are immense. For those who ignore it, the risks are equally significant.\n\nThe future belongs to those who understand that ${p.keyTakeaway}. And that future is already here.\n\n---\n\n*This article explores current developments in ${p.theme}. For more insights, follow our continuing coverage.*`,
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
  const middle = pick(middles)(params);
  const ending = pick(endings)(params);

  const body = opening + middle + ending;
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
