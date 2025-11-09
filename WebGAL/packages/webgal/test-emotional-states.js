/**
 * Test script to verify Harper emotional state mappings
 * This tests that all emotional states map to valid animation files
 */

// Simulate the getHarperAnimation function logic
function getHarperAnimation(state) {
  const normalizedState = state.toLowerCase().trim();

  const primaryAnimationMap = {
    'calm': 'Harper_Calm.webp',
    'nervous': 'Harper_nervous.webp',
    'defensive': 'Harper_defensive.webp',
    'angry': 'Harper_Angry.webp',
    'breaking': 'Harper_breaking.webp',
    'surprised': 'Harper_surprised.webp',
    'agreeing': 'Harper_Agreeing.webp',
    'lookingdown': 'Harper_lookingDown.webp'
  };

  const fallbackMap = {
    'confused': 'Harper_surprised.webp',
    'uncertain': 'Harper_nervous.webp',
    'unsure': 'Harper_nervous.webp',
    'worried': 'Harper_nervous.webp',
    'panicked': 'Harper_breaking.webp',
    'scared': 'Harper_nervous.webp',
    'frightened': 'Harper_nervous.webp',
    'terrified': 'Harper_breaking.webp',
    'cooperative': 'Harper_Agreeing.webp',
    'agreeable': 'Harper_Agreeing.webp',
    'compliant': 'Harper_Agreeing.webp',
    'accepting': 'Harper_Agreeing.webp',
    'hostile': 'Harper_Angry.webp',
    'aggressive': 'Harper_Angry.webp',
    'defiant': 'Harper_Angry.webp',
    'resistant': 'Harper_defensive.webp',
    'crying': 'Harper_breaking.webp',
    'tearful': 'Harper_breaking.webp',
    'emotional': 'Harper_breaking.webp',
    'overwhelmed': 'Harper_breaking.webp',
    'evasive': 'Harper_defensive.webp',
    'guarded': 'Harper_defensive.webp',
    'closed off': 'Harper_defensive.webp',
    'withdrawn': 'Harper_lookingDown.webp',
    'shocked': 'Harper_surprised.webp',
    'startled': 'Harper_surprised.webp',
    'stunned': 'Harper_surprised.webp',
    'disbelief': 'Harper_surprised.webp',
    'composed': 'Harper_Calm.webp',
    'collected': 'Harper_Calm.webp',
    'controlled': 'Harper_Calm.webp',
    'stoic': 'Harper_Calm.webp'
  };

  if (primaryAnimationMap[normalizedState]) {
    return primaryAnimationMap[normalizedState];
  }

  if (fallbackMap[normalizedState]) {
    return fallbackMap[normalizedState];
  }

  console.warn(`Unknown emotional state: "${state}". Falling back to nervous animation.`);
  return 'Harper_nervous.webp';
}

// Available animation files in the public/game/figure directory
const availableFiles = [
  'Harper_Agreeing.webp',
  'Harper_Angry.webp',
  'Harper_breaking.webp',
  'Harper_Calm.webp',
  'Harper_defensive.webp',
  'Harper_lookingDown.webp',
  'Harper_nervous.webp',
  'Harper_surprised.webp'
];

// Test cases
const testCases = [
  // Primary states
  { input: 'calm', expected: 'Harper_Calm.webp', category: 'Primary' },
  { input: 'nervous', expected: 'Harper_nervous.webp', category: 'Primary' },
  { input: 'defensive', expected: 'Harper_defensive.webp', category: 'Primary' },
  { input: 'angry', expected: 'Harper_Angry.webp', category: 'Primary' },
  { input: 'breaking', expected: 'Harper_breaking.webp', category: 'Primary' },
  { input: 'surprised', expected: 'Harper_surprised.webp', category: 'Primary' },
  { input: 'agreeing', expected: 'Harper_Agreeing.webp', category: 'Primary' },
  { input: 'lookingdown', expected: 'Harper_lookingDown.webp', category: 'Primary' },

  // Case variations (should normalize)
  { input: 'Calm', expected: 'Harper_Calm.webp', category: 'Case Handling' },
  { input: 'NERVOUS', expected: 'Harper_nervous.webp', category: 'Case Handling' },
  { input: 'Angry', expected: 'Harper_Angry.webp', category: 'Case Handling' },

  // Fallback mappings
  { input: 'confused', expected: 'Harper_surprised.webp', category: 'Fallback' },
  { input: 'worried', expected: 'Harper_nervous.webp', category: 'Fallback' },
  { input: 'panicked', expected: 'Harper_breaking.webp', category: 'Fallback' },
  { input: 'scared', expected: 'Harper_nervous.webp', category: 'Fallback' },
  { input: 'cooperative', expected: 'Harper_Agreeing.webp', category: 'Fallback' },
  { input: 'hostile', expected: 'Harper_Angry.webp', category: 'Fallback' },
  { input: 'crying', expected: 'Harper_breaking.webp', category: 'Fallback' },
  { input: 'evasive', expected: 'Harper_defensive.webp', category: 'Fallback' },
  { input: 'shocked', expected: 'Harper_surprised.webp', category: 'Fallback' },
  { input: 'composed', expected: 'Harper_Calm.webp', category: 'Fallback' },

  // Unknown states (should fall back to nervous)
  { input: 'happy', expected: 'Harper_nervous.webp', category: 'Unknown' },
  { input: 'excited', expected: 'Harper_nervous.webp', category: 'Unknown' },
  { input: 'random', expected: 'Harper_nervous.webp', category: 'Unknown' }
];

console.log('=== TESTING HARPER EMOTIONAL STATE MAPPINGS ===\n');

let passed = 0;
let failed = 0;

testCases.forEach(test => {
  const result = getHarperAnimation(test.input);
  const isValid = availableFiles.includes(result);
  const matches = result === test.expected;

  if (matches && isValid) {
    console.log(`✅ [${test.category}] "${test.input}" -> ${result}`);
    passed++;
  } else {
    console.log(`❌ [${test.category}] "${test.input}" -> ${result} (expected: ${test.expected}, valid: ${isValid})`);
    failed++;
  }
});

console.log('\n=== SUMMARY ===');
console.log(`Total tests: ${testCases.length}`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);

// Verify all available files are used
console.log('\n=== ANIMATION FILE USAGE ===');
const usedFiles = new Set();
testCases.forEach(test => {
  usedFiles.add(getHarperAnimation(test.input));
});

availableFiles.forEach(file => {
  if (usedFiles.has(file)) {
    console.log(`✅ ${file} - USED`);
  } else {
    console.log(`⚠️  ${file} - NOT TESTED`);
  }
});

console.log('\n=== TEST COMPLETE ===');
process.exit(failed > 0 ? 1 : 0);
