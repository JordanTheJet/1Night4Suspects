import { ISentence } from '@/Core/controller/scene/sceneInterface';
import { IPerform } from '@/Core/Modules/perform/performInterface';
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import styles from './llmInterrogate.module.scss';
import { webgalStore } from '@/store/store';
import { textFont } from '@/store/userDataInterface';
import { useSEByWebgalStore } from '@/hooks/useSoundEffect';
import { WebGAL } from '@/Core/WebGAL';
import { Provider } from 'react-redux';
import { getInterrogationController } from '@/Core/controller/llm/interrogationController';
import { nextSentence } from '@/Core/controller/gamePlay/nextSentence';

/**
 * Start LLM-powered interrogation mode
 * @param sentence
 */
export const llmInterrogate = (sentence: ISentence): IPerform => {
  console.log('🎮 llmInterrogate command called!');
  const suspectName = sentence.content.toString().trim() || 'Harper Lin';
  // Only use import.meta.env in browser context (process.env doesn't exist in browser)
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  console.log('🔑 API Key present:', !!apiKey);
  console.log('🔑 API Key length:', apiKey?.length);
  console.log('👤 Suspect name:', suspectName);

  const container = document.getElementById('chooseContainer');
  console.log('📦 Container found:', !!container);

  ReactDOM.render(
    <Provider store={webgalStore}>
      <LLMInterrogation suspectName={suspectName} apiKey={apiKey} />
    </Provider>,
    container,
  );

  return {
    performName: 'llmInterrogate',
    duration: 1000 * 60 * 60 * 24, // Long duration
    isHoldOn: false,
    stopFunction: () => {
      ReactDOM.render(<div />, document.getElementById('chooseContainer'));
    },
    blockingNext: () => true,
    blockingAuto: () => true,
    stopTimeout: undefined,
  };
};

interface LLMInterrogationProps {
  suspectName: string;
  apiKey?: string;
}

function LLMInterrogation(props: LLMInterrogationProps) {
  const { suspectName, apiKey } = props;
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<string>(`Waiting for ${suspectName} to enter...`);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [emotionalState, setEmotionalState] = useState<string>('nervous');
  // Set initial stats based on suspect
  const getInitialStats = () => {
    switch (suspectName) {
      case 'Marcus Hale':
        return { stress: 40, trust: 45, lies: 0, contradictions: 0 };
      case 'Rowan Adler':
        return { stress: 25, trust: 40, lies: 0, contradictions: 0 };
      case 'Harper Lin':
      default:
        return { stress: 35, trust: 25, lies: 0, contradictions: 0 };
    }
  };
  const [stats, setStats] = useState(getInitialStats());
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customQuestion, setCustomQuestion] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  const fontFamily = webgalStore.getState().userData.optionData.textboxFont;
  const font = fontFamily === textFont.song ? '"思源宋体", serif' : '"WebgalUI", serif';
  const { playSeEnter, playSeClick } = useSEByWebgalStore();

  // Initialize with opening statement - using ref to prevent infinite loop
  const initializationStarted = React.useRef(false);
  const isMounted = React.useRef(true);

  useEffect(() => {
    // Mark component as mounted
    isMounted.current = true;
    initializationStarted.current = true;

    // Only run once when component mounts
    if (apiKey) {
      initializeInterrogation();
    }

    // Cleanup on unmount
    return () => {
      console.log('🧹 LLM Interrogation component unmounting');
      isMounted.current = false;
      initializationStarted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeInterrogation = async () => {
    if (!apiKey) {
      if (isMounted.current) {
        setLoading(false);
        setError('API Key not configured. Please set VITE_ANTHROPIC_API_KEY in .env file.');
      }
      return;
    }

    try {
      console.log('🔄 Initializing interrogation with suspect:', suspectName);
      console.log('🔑 API Key available:', !!apiKey, 'Length:', apiKey?.length);

      const controller = getInterrogationController(apiKey, suspectName as any);
      console.log('🎮 Controller created, sending initial question...');

      const result = await controller.askHarper('Begin the interrogation. Introduce yourself.');
      console.log('✅ Got response from Claude:', result);

      // Check if component is still mounted before updating state
      if (!isMounted.current) {
        console.log('⚠️ Component unmounted, skipping state update');
        return;
      }

      console.log('✅ Interrogation initialized successfully');
      console.log('📝 Response text:', result.response);
      console.log('💡 Suggestions:', result.suggestions);
      console.log('😐 Emotional state:', result.emotionalState);
      console.log('📊 Stats:', result.stats);

      setResponse(result.response);
      setSuggestions(result.suggestions);
      setEmotionalState(result.emotionalState);
      setStats(result.stats);
      setIsInitialized(true);
      setLoading(false);

      console.log('✅ State updated, loading set to false');
    } catch (err) {
      console.error('❌ Failed to initialize interrogation:', err);
      console.error('❌ Error details:', {
        name: err instanceof Error ? err.name : 'Unknown',
        message: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : undefined
      });
      if (!isMounted.current) return;
      setLoading(false);
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(`Failed to initialize Claude AI: ${errorMessage}. Check console for details.`);
    }
  };

  const handleAskQuestion = async (question: string) => {
    if (!apiKey) {
      setError('API Key not configured');
      return;
    }

    setLoading(true);
    setError(null);
    setCustomQuestion('');
    setShowCustomInput(false);

    try {
      const controller = getInterrogationController(apiKey, suspectName as any);
      const result = await controller.askHarper(question);

      // Check if component is still mounted before updating state
      if (!isMounted.current) return;

      setResponse(result.response);
      setSuggestions(result.suggestions);
      setEmotionalState(result.emotionalState);
      setStats(result.stats);
    } catch (err) {
      console.error('Failed to ask question:', err);
      if (!isMounted.current) return;
      setError(`Failed to get response: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    playSeClick();
    handleAskQuestion(suggestion);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customQuestion.trim()) {
      playSeClick();
      handleAskQuestion(customQuestion);
    }
  };

  const handleEndInterrogation = () => {
    playSeClick();
    WebGAL.gameplay.performController.unmountPerform('llmInterrogate');
    nextSentence();
  };

  // Error state
  if (error) {
    return (
      <div className={styles.LLM_Main}>
        <div className={styles.LLM_Error}>
          {error}
          <div style={{ marginTop: '1em' }}>
            <button className={styles.LLM_Action_Button} onClick={handleEndInterrogation}>
              Return to Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Map emotional states to animation files with intelligent fallbacks
  const getSuspectAnimation = (state: typeof emotionalState): string => {
    // Normalize state to lowercase for comparison
    const normalizedState = state.toLowerCase().trim();

    // Get suspect prefix (Harper, Marcus, Rowan)
    const suspectPrefix = suspectName.split(' ')[0].toLowerCase();

    // Define state mappings based on suspect
    let primaryStates: Record<string, string>;
    let fallbackStates: Record<string, string>;
    let defaultState: string;

    if (suspectPrefix === 'harper') {
      primaryStates = {
        'calm': 'Harper_Calm.webp',
        'nervous': 'Harper_nervous.webp',
        'defensive': 'Harper_defensive.webp',
        'angry': 'Harper_Angry.webp',
        'breaking': 'Harper_breaking.webp',
        'surprised': 'Harper_surprised.webp',
        'agreeing': 'Harper_Agreeing.webp',
        'lookingdown': 'Harper_lookingDown.webp'
      };
      fallbackStates = {
        'confused': 'Harper_surprised.webp',
        'worried': 'Harper_nervous.webp',
        'panicked': 'Harper_breaking.webp',
        'cooperative': 'Harper_Agreeing.webp',
        'hostile': 'Harper_Angry.webp',
        'crying': 'Harper_breaking.webp',
        'evasive': 'Harper_defensive.webp',
        'shocked': 'Harper_surprised.webp',
        'composed': 'Harper_Calm.webp'
      };
      defaultState = 'Harper_nervous.webp';
    } else if (suspectPrefix === 'marcus') {
      primaryStates = {
        'neutral': 'marcus_neutral.png',
        'nervous': 'marcus_nervous.png',
        'defensive': 'marcus_defensive.png',
        'bitter': 'marcus_bitter.png',
        'angry': 'marcus_angry.png',
        'controlled': 'marcus_controlled.png',
        'resigned': 'marcus_resigned.png'
      };
      fallbackStates = {
        'calm': 'marcus_controlled.png',
        'exhausted': 'marcus_resigned.png',
        'panicked': 'marcus_nervous.png',
        'desperate': 'marcus_nervous.png',
        'guilty': 'marcus_resigned.png',
        'firm': 'marcus_controlled.png',
        'tense': 'marcus_defensive.png',
        'explosive': 'marcus_angry.png',
        'defeated': 'marcus_resigned.png',
        'breaking': 'marcus_nervous.png',
        'honest': 'marcus_neutral.png',
        'ashamed': 'marcus_resigned.png',
        'thoughtful': 'marcus_neutral.png'
      };
      defaultState = 'marcus_defensive.png';
    } else { // rowan
      primaryStates = {
        'calm': 'rowan_calm.png',
        'neutral': 'rowan_neutral.png',
        'cold': 'rowan_cold.png',
        'calculating': 'rowan_calculating.png',
        'controlled': 'rowan_controlled.png',
        'sharp': 'rowan_sharp.png',
        'tense': 'rowan_tense.png'
      };
      fallbackStates = {
        'composed': 'rowan_calm.png',
        'measured': 'rowan_controlled.png',
        'analytical': 'rowan_calculating.png',
        'careful': 'rowan_controlled.png',
        'regretful': 'rowan_neutral.png',
        'dismissive': 'rowan_cold.png',
        'grave': 'rowan_tense.png',
        'somber': 'rowan_neutral.png',
        'honest': 'rowan_neutral.png',
        'methodical': 'rowan_calculating.png',
        'precise': 'rowan_controlled.png',
        'cynical': 'rowan_cold.png',
        'revealing': 'rowan_neutral.png',
        'firm': 'rowan_sharp.png',
        'serious': 'rowan_tense.png',
        'defensive': 'rowan_tense.png',
        'conflicted': 'rowan_tense.png',
        'uncertain': 'rowan_neutral.png',
        'offended': 'rowan_sharp.png',
        'resigned': 'rowan_neutral.png',
        'vulnerable': 'rowan_neutral.png',
        'thoughtful': 'rowan_calm.png',
        'weary': 'rowan_tense.png',
        'exposed': 'rowan_tense.png',
        'quiet': 'rowan_calm.png'
      };
      defaultState = 'rowan_calm.png';
    }

    // Try primary mapping first
    if (primaryStates[normalizedState]) {
      const basePath = import.meta.env.DEV ? '' : '.';
      return `${basePath}/game/figure/${primaryStates[normalizedState]}`;
    }

    // Try fallback mapping
    if (fallbackStates[normalizedState]) {
      const basePath = import.meta.env.DEV ? '' : '.';
      return `${basePath}/game/figure/${fallbackStates[normalizedState]}`;
    }

    // Default fallback
    console.warn(`Unknown emotional state: "${state}" for ${suspectName}. Using default animation.`);
    const basePath = import.meta.env.DEV ? '' : '.';
    return `${basePath}/game/figure/${defaultState}`;
  };

  // Detective uses talking animation when asking, questioning when listening
  const getDetectiveAnimation = (): string => {
    const basePath = import.meta.env.DEV ? '' : '.';
    return loading
      ? `${basePath}/game/figure/Detective_Questioning.gif`
      : `${basePath}/game/figure/Detective_Talking.gif`;
  };

  // Main render with defensive checks
  try {
    return (
      <div className={styles.LLM_Main} style={{ fontFamily: font }}>
        <div className={styles.LLM_Container}>
        {/* Header with Stats */}
        <div className={styles.LLM_Header}>
          <div className={styles.LLM_Header_Title}>
            Interrogating: {suspectName}
          </div>
          <div className={styles.LLM_Stats_Container}>
            <div className={styles.LLM_Stat}>
              <div className={styles.LLM_Stat_Label}>Stress</div>
              <div className={styles.LLM_Stat_Bar_Container}>
                <div
                  className={`${styles.LLM_Stat_Bar} ${styles.LLM_Stat_Bar_Stress}`}
                  style={{ width: `${stats.stress}%` }}
                />
              </div>
            </div>
            <div className={styles.LLM_Stat}>
              <div className={styles.LLM_Stat_Label}>Trust</div>
              <div className={styles.LLM_Stat_Bar_Container}>
                <div
                  className={`${styles.LLM_Stat_Bar} ${styles.LLM_Stat_Bar_Trust}`}
                  style={{ width: `${stats.trust}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Character Animations */}
        <div className={styles.LLM_Characters_Container}>
          {/* Detective on left */}
          <div className={styles.LLM_Character_Left}>
            <img
              src={getDetectiveAnimation()}
              alt="Detective"
              className={styles.LLM_Character_Image}
            />
            <div className={styles.LLM_Character_Label}>Detective</div>
          </div>

          {/* Suspect on right */}
          <div className={styles.LLM_Character_Right}>
            <img
              src={getSuspectAnimation(emotionalState)}
              alt={suspectName}
              className={styles.LLM_Character_Image}
            />
            <div className={styles.LLM_Character_Label}>{suspectName}</div>
          </div>
        </div>

        {/* Response Section */}
        <div className={styles.LLM_Response_Container}>
          {loading ? (
            <div className={styles.LLM_Loading}>
              {suspectName} is responding...
            </div>
          ) : (
            <>
              <div className={`${styles.LLM_Emotional_State} ${styles[`LLM_State_${emotionalState}`]}`}>
                {emotionalState}
              </div>
              <div className={styles.LLM_Response_Text}>
                {response || 'No response yet...'}
              </div>
            </>
          )}
          {/* Debug info */}
          {!loading && !response && (
            <div style={{ color: 'red', marginTop: '1em', fontSize: '14px' }}>
              DEBUG: Loading={String(loading)}, Response length={response?.length || 0}, IsInitialized={String(isInitialized)}
            </div>
          )}
        </div>

        {/* Questions Section - Compact Layout */}
        {!loading && (
          <div className={styles.LLM_Questions_Section}>
            {/* Header with inline custom input */}
            <div className={styles.LLM_Questions_Header}>
              <div className={styles.LLM_Questions_Title}>Questions:</div>
              <form className={styles.LLM_Custom_Input_Form_Inline} onSubmit={handleCustomSubmit}>
                <input
                  className={styles.LLM_Custom_Input_Inline}
                  type="text"
                  placeholder="Enter your own question..."
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  onMouseEnter={playSeEnter}
                />
                <button
                  type="submit"
                  className={styles.LLM_Custom_Submit_Inline}
                  disabled={!customQuestion.trim()}
                  onMouseEnter={playSeEnter}
                >
                  Ask
                </button>
              </form>
            </div>

            {/* Suggested Questions - Show only first 2 */}
            {suggestions.length > 0 && (
              <div className={styles.LLM_Suggestions_Grid}>
                {suggestions.slice(0, 2).map((suggestion, index) => (
                  <button
                    key={index}
                    className={styles.LLM_Suggestion_Button}
                    onClick={() => handleSuggestionClick(suggestion)}
                    onMouseEnter={playSeEnter}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {!loading && isInitialized && (
          <div className={styles.LLM_Actions_Container}>
            <button
              className={`${styles.LLM_Action_Button} ${styles.LLM_Action_End}`}
              onClick={handleEndInterrogation}
              onMouseEnter={playSeEnter}
            >
              End Interrogation
            </button>
          </div>
        )}
      </div>
    </div>
    );
  } catch (renderError) {
    console.error('❌ Render error in LLM Interrogation:', renderError);
    return (
      <div className={styles.LLM_Main}>
        <div className={styles.LLM_Error}>
          Critical rendering error: {renderError instanceof Error ? renderError.message : 'Unknown error'}
          <div style={{ marginTop: '1em' }}>
            <button className={styles.LLM_Action_Button} onClick={handleEndInterrogation}>
              Return to Game
            </button>
          </div>
        </div>
      </div>
    );
  }
}
