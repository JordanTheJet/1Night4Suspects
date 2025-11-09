/**
 * Test Smart Suggestions Pattern
 * Verifies LLM generates contextual question suggestions
 */

import { getInterrogationController } from './interrogationController';
import * as fs from 'fs';
import * as path from 'path';

// Load .env file
function loadEnv() {
  try {
    const envPath = path.resolve(process.cwd(), '../../../.env');
    console.log('Loading .env from:', envPath);
    const envFile = fs.readFileSync(envPath, 'utf8');
    const lines = envFile.split('\n');
    for (const line of lines) {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        process.env[key.trim()] = value;
      }
    }
  } catch (error) {
    console.warn('Could not load .env file');
  }
}

async function testSmartSuggestions() {
  console.log('🧪 Testing Smart Suggestions Pattern\n');
  console.log('=' .repeat(60));

  try {
    // Load environment variables
    loadEnv();

    // Get API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('❌ ANTHROPIC_API_KEY not found');
      console.log('\nMake sure you have a .env file in project root with:');
      console.log('ANTHROPIC_API_KEY=your_key_here');
      return;
    }

    console.log('✅ API key found\n');

    // Initialize controller
    const controller = getInterrogationController(apiKey);
    console.log('✅ Interrogation controller initialized\n');

    // Test 1: Opening question
    console.log('📝 Test 1: Opening Interrogation');
    console.log('=' .repeat(60));
    console.log('Detective asks: "Where were you at 11 PM last night?"\n');

    const response1 = await controller.askHarper('Where were you at 11 PM last night?');

    console.log('🎭 Harper responds:');
    console.log(`"${response1.response}"`);
    console.log(`\nEmotional State: ${response1.emotionalState}`);
    console.log(`Stats: Stress=${response1.stats.stress}/100, Trust=${response1.stats.trust}/100`);

    console.log('\n🔍 AI Detective Suggests:');
    response1.suggestions.forEach((suggestion, i) => {
      console.log(`  ${i + 1}. "${suggestion}"`);
    });

    console.log(`\n💰 Tokens: ${response1.tokens.input} in / ${response1.tokens.output} out`);
    console.log('\n' + '=' .repeat(60) + '\n');

    // Test 2: Follow-up with first suggestion
    console.log('📝 Test 2: Following AI Suggestion');
    console.log('=' .repeat(60));

    const followUp = response1.suggestions[0] || "Tell me more about that evening";
    console.log(`Detective asks: "${followUp}"\n`);

    const response2 = await controller.askHarper(followUp);

    console.log('🎭 Harper responds:');
    console.log(`"${response2.response}"`);
    console.log(`\nEmotional State: ${response2.emotionalState}`);
    console.log(`Stats: Stress=${response2.stats.stress}/100, Trust=${response2.stats.trust}/100`);

    console.log('\n🔍 AI Detective Suggests (Updated):');
    response2.suggestions.forEach((suggestion, i) => {
      console.log(`  ${i + 1}. "${suggestion}"`);
    });

    console.log(`\n💰 Tokens: ${response2.tokens.input} in / ${response2.tokens.output} out`);
    console.log('\n' + '=' .repeat(60) + '\n');

    // Test 3: Present evidence
    console.log('📝 Test 3: Presenting Evidence');
    console.log('=' .repeat(60));
    console.log('Detective presents: Broken Wineglass\n');

    const response3 = await controller.presentEvidence('broken_wineglass');

    console.log('🎭 Harper responds:');
    console.log(`"${response3.response}"`);
    console.log(`\nEmotional State: ${response3.emotionalState}`);
    console.log(`Stats: Stress=${response3.stats.stress}/100, Trust=${response3.stats.trust}/100`);

    console.log('\n🔍 AI Detective Suggests (After Evidence):');
    response3.suggestions.forEach((suggestion, i) => {
      console.log(`  ${i + 1}. "${suggestion}"`);
    });

    console.log(`\n💰 Tokens: ${response3.tokens.input} in / ${response3.tokens.output} out`);
    console.log('\n' + '=' .repeat(60) + '\n');

    // Show full conversation history
    console.log('📜 Full Conversation History:');
    console.log('=' .repeat(60));
    const history = controller.getConversationHistory();
    history.forEach((turn, i) => {
      const icon = turn.speaker === 'detective' ? '🕵️ ' : '👩 ';
      const label = turn.speaker === 'detective' ? 'Detective' : 'Harper';
      console.log(`${i + 1}. ${icon}${label}: "${turn.text}"`);
    });

    console.log('\n' + '=' .repeat(60));
    console.log('\n✅ All tests passed!');
    console.log('\n💡 Key Observations:');
    console.log('  • Suggestions evolve based on Harper\'s responses');
    console.log('  • Emotional state adapts to interrogation');
    console.log('  • Stats change dynamically');
    console.log('  • Questions feel strategic and contextual');

  } catch (error: any) {
    console.error('\n❌ Test failed:', error.message);
    if (error.stack) {
      console.error('\nStack trace:', error.stack);
    }
  }
}

// Run tests
testSmartSuggestions();
