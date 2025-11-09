/**
 * Test script for LLM interrogation system
 * Run with: node --loader ts-node/esm test.ts
 */

import { getInterrogationController } from './interrogationController';

async function testInterrogation() {
  console.log('🧪 Testing LLM Interrogation System\n');

  try {
    // Get API key from environment
    const apiKey = process.env.ANTHROPIC_API_KEY || import.meta.env?.VITE_ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('❌ ANTHROPIC_API_KEY not found in environment');
      return;
    }

    // Initialize controller
    const controller = getInterrogationController(apiKey);
    console.log('✅ Controller initialized\n');

    // Test 1: Basic question
    console.log('📝 Test 1: Basic question');
    console.log('Question: "Where were you at 11 PM last night?"');
    const response1 = await controller.askHarper('Where were you at 11 PM last night?');
    console.log(`Harper: ${response1.response}`);
    console.log(`Stats: Stress=${response1.stats.stress}, Trust=${response1.stats.trust}`);
    console.log(`Tokens: Input=${response1.tokens.input}, Output=${response1.tokens.output}\n`);

    // Test 2: Present evidence
    console.log('📝 Test 2: Present evidence');
    const response2 = await controller.presentEvidence('broken_wineglass');
    console.log(`Harper: ${response2.response}`);
    console.log(`Stats: Stress=${response2.stats.stress}, Trust=${response2.stats.trust}\n`);

    // Test 3: Follow-up question
    console.log('📝 Test 3: Follow-up question');
    const response3 = await controller.askHarper('You said you were in your room, but we have evidence you were at the dock. Explain.');
    console.log(`Harper: ${response3.response}`);
    console.log(`Stats: Stress=${response3.stats.stress}, Trust=${response3.stats.trust}\n`);

    // Show conversation history
    console.log('📜 Conversation History:');
    const history = controller.getConversationHistory();
    history.forEach((turn, i) => {
      const label = turn.speaker === 'detective' ? '🕵️  Detective' : '👩  Harper';
      console.log(`${i + 1}. ${label}: ${turn.text}`);
    });

    console.log('\n✅ All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run tests
testInterrogation();
