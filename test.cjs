const ai = require('./ai');

async function test() {
  for (let i = 0; i < 5; i++) {
    try {
      console.log(`Starting test ${i}...`);
      const result = await ai.generate({
        idea: 'A lonely robot finds a flower part ' + i,
        contentType: 'story',
        wordLimit: 50
      });
      console.log(`Success ${i}:`, result.content.substring(0, 50));
    } catch (e) {
      console.error(`Failed ${i}:`, e.message || e);
    }
  }
}

test();
