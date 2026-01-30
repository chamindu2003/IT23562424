const { transliterate } = require('./src/transliterate.node.js');

// load test cases from tests/transliteration.spec.js by requiring it
// we will parse the file to extract the testCases array
const fs = require('fs');
const path = require('path');

const specPath = path.join(__dirname, 'tests', 'transliteration.spec.js');
const spec = fs.readFileSync(specPath, 'utf8');
const match = spec.match(/const testCases = ([\s\S]*?\n\];)/m);
if (!match) {
  console.error('Could not extract testCases from tests/transliteration.spec.js');
  process.exit(2);
}

// eslint-disable-next-line no-eval
const testCases = eval(match[1]);

let failures = 0;
let passes = 0;

for (const tc of testCases) {
  const actual = transliterate(tc.input || '');
  const matches = actual.trim() === (tc.expected || '').trim();

  if (matches) {
    passes++;
    console.log(`PASS ${tc.id} - ${tc.name}`);
  } else {
    failures++;
    console.error(`FAIL ${tc.id} - ${tc.name}`);
    console.error(`  input: ${tc.input}`);
    console.error(`  expected: ${tc.expected}`);
    console.error(`  actual: ${actual}`);
  }
}

console.log('\n--- Test Summary ---');
console.log(`Passed: ${passes}`);
console.log(`Failed: ${failures}`);

if (failures) {
  console.error(`\n${failures} test(s) failed`);
  process.exit(1);
} else {
  console.log('\nAll tests passed');
  process.exit(0);
}
