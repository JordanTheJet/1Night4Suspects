import { ISentence } from '@/Core/controller/scene/sceneInterface';
import { IPerform } from '@/Core/Modules/perform/performInterface';
import { getClaudeClient } from '@/Core/controller/llm/claudeClient';
import { nextSentence } from '@/Core/controller/gamePlay/nextSentence';
import { sceneParser } from '@/Core/parser/sceneParser';
import { WebGAL } from '@/Core/WebGAL';

/**
 * Check Claude API connection and redirect based on result
 * @param sentence
 */
export const llmApiCheck = (sentence: ISentence): IPerform => {
  console.log('🔍 Checking AI API connection...');

  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

  // Start API check asynchronously
  setTimeout(async () => {
    try {
      if (!apiKey) {
        console.error('❌ API key not found');
        // Redirect to error scene
        showApiError('API key not configured. Please set VITE_ANTHROPIC_API_KEY in your .env file.');
        return;
      }

      const client = getClaudeClient(apiKey);
      const isConnected = await client.testConnection();

      if (isConnected) {
        console.log('✅ API connection successful, proceeding to AI mode');
        // Redirect to AI mode start
        WebGAL.sceneManager.sceneData.currentSentenceId = 0;
        const sceneUrl = 'start_ai.txt';
        const rawScene = await fetch(`game/scene/${sceneUrl}`);
        const sceneText = await rawScene.text();
        WebGAL.sceneManager.sceneData.currentScene = sceneParser(sceneText, sceneUrl, sceneText);
        nextSentence();
      } else {
        console.error('❌ API connection failed');
        showApiError('Failed to connect to AI service. This could be due to:\n• Invalid API key\n• Insufficient account balance\n• Network connectivity issues\n\nPlease check your API key and account status, or try Story Mode instead.');
      }
    } catch (error) {
      console.error('❌ API check error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      showApiError(`API Error: ${errorMessage}\n\nYou can try Story Mode instead, which doesn't require an API key.`);
    }
  }, 100);

  return {
    performName: 'llmApiCheck',
    duration: 0,
    isHoldOn: false,
    stopFunction: () => {},
    blockingNext: () => false,
    blockingAuto: () => true,
    stopTimeout: undefined,
  };
};

/**
 * Show API error dialog with option to switch to Story mode
 */
function showApiError(message: string) {
  // Create error dialog with choice
  const errorScene = `
changeBg:police_station_hallway.png -next;
API CONNECTION ERROR;
;
${message};
;
choose:Try Story Mode Instead:start_story.txt|Return to Main Menu:start.txt;
  `.trim();

  WebGAL.sceneManager.sceneData.currentSentenceId = 0;
  WebGAL.sceneManager.sceneData.currentScene = sceneParser(errorScene, 'api_error.txt', errorScene);
  nextSentence();
}
