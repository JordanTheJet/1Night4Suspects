import { ClaudeClient, ClaudeMessage, getClaudeClient } from './claudeClient';
import { HarperInterrogationState, getSuspectState, resetSuspectState, SuspectId } from './interrogationState';
import { buildHarperSystemPrompt } from './harperPrompt';
import { buildMarcusSystemPrompt } from './marcusPrompt';
import { buildRowanSystemPrompt } from './rowanPrompt';

type SuspectName = 'Harper Lin' | 'Marcus Hale' | 'Rowan Adler';

/**
 * Main controller for LLM-powered interrogations
 */
export class InterrogationController {
  private claudeClient: ClaudeClient;
  private currentState: HarperInterrogationState;
  private currentSuspect: SuspectName;

  constructor(apiKey?: string, suspectName: SuspectName = 'Harper Lin') {
    this.claudeClient = getClaudeClient(apiKey);
    this.currentSuspect = suspectName;
    this.currentState = this.loadSuspectState(suspectName);
    console.log(`✅ Interrogation Controller initialized for ${suspectName}`);
  }

  /**
   * Load the appropriate state for a suspect
   */
  private loadSuspectState(suspectName: SuspectName): HarperInterrogationState {
    const suspectId = this.getSuspectId(suspectName);
    const initialStats = this.getInitialStats(suspectName);
    return getSuspectState(suspectId, initialStats);
  }

  /**
   * Convert suspect name to suspect ID
   */
  private getSuspectId(suspectName: SuspectName): SuspectId {
    switch (suspectName) {
      case 'Harper Lin':
        return 'harper';
      case 'Marcus Hale':
        return 'marcus';
      case 'Rowan Adler':
        return 'rowan';
      default:
        return 'harper';
    }
  }

  /**
   * Set the current suspect being interrogated
   */
  setSuspect(suspectName: SuspectName): void {
    this.currentSuspect = suspectName;
    this.currentState = this.loadSuspectState(suspectName);
    console.log(`🔄 Switched to interrogating ${suspectName}`);
  }

  /**
   * Get the appropriate system prompt builder based on current suspect
   */
  private getSystemPromptBuilder(): (state: any, includeSuggestions: boolean) => string {
    switch (this.currentSuspect) {
      case 'Harper Lin':
        return buildHarperSystemPrompt;
      case 'Marcus Hale':
        return buildMarcusSystemPrompt;
      case 'Rowan Adler':
        return buildRowanSystemPrompt;
      default:
        return buildHarperSystemPrompt;
    }
  }

  /**
   * Get initial stats for each suspect
   */
  private getInitialStats(suspectName: SuspectName): { stress: number; trust: number } {
    switch (suspectName) {
      case 'Harper Lin':
        return { stress: 35, trust: 25 };
      case 'Marcus Hale':
        return { stress: 40, trust: 45 };
      case 'Rowan Adler':
        return { stress: 25, trust: 40 };
      default:
        return { stress: 35, trust: 25 };
    }
  }

  /**
   * Ask the current suspect a question and get dynamic response with suggested follow-up questions
   */
  async askHarper(
    question: string,
    evidenceId?: string,
    onStream?: (chunk: string) => void
  ): Promise<{
    response: string;
    suggestions: string[];
    emotionalState: string;
    stats: { stress: number; trust: number; lies: number; contradictions: number };
    tokens: { input: number; output: number };
  }> {
    try {
      // Add detective's question to conversation history
      this.currentState.addTurn('detective', question, evidenceId);

      // If evidence was presented, mark it
      if (evidenceId) {
        this.currentState.presentEvidence(evidenceId);
      }

      // Get current state
      const state = this.currentState.getState();

      // Build system prompt with current context - includes instruction for suggestions
      const promptBuilder = this.getSystemPromptBuilder();
      const systemPrompt = promptBuilder(state, true); // true = include suggestions

      // Build conversation messages for Claude
      const messages: ClaudeMessage[] = [
        {
          role: 'user',
          content: question
        }
      ];

      // Get response from Claude
      const result = await this.claudeClient.generateResponse(
        systemPrompt,
        messages,
        onStream
      );

      // Parse the structured response
      const parsed = this.parseStructuredResponse(result.content);

      // Parse response for stat changes
      this.currentState.parseStatChanges(parsed.response);

      // Clean response (remove stat change markers)
      const cleanedResponse = parsed.response
        .replace(/\[([+-])(stress|trust):\d+\]/g, '')
        .trim();

      // Add suspect's response to history
      this.currentState.addTurn('suspect', cleanedResponse);

      // Return response with suggestions and updated stats
      const updatedState = this.currentState.getState();
      return {
        response: cleanedResponse,
        suggestions: parsed.suggestions,
        emotionalState: parsed.emotionalState,
        stats: updatedState.stats,
        tokens: {
          input: result.usage.inputTokens,
          output: result.usage.outputTokens
        }
      };
    } catch (error) {
      console.error('❌ Error in askHarper:', error);
      throw error;
    }
  }

  /**
   * Parse structured response from Claude
   * Expects format: RESPONSE: [text] | SUGGESTIONS: [q1] | [q2] | [q3] | STATE: [emotional]
   */
  private parseStructuredResponse(content: string): {
    response: string;
    suggestions: string[];
    emotionalState: string;
  } {
    try {
      // Try to parse structured format with more flexible regex
      const responseMatch = content.match(/RESPONSE:\s*(.+?)(?=\s*SUGGESTIONS:)/s);
      const suggestionsMatch = content.match(/SUGGESTIONS:\s*(.+?)(?=\s*STATE:)/s);
      const stateMatch = content.match(/STATE:\s*(\w+)/);

      if (responseMatch && suggestionsMatch) {
        const response = responseMatch[1].trim();
        const suggestionsText = suggestionsMatch[1].trim();

        // Split suggestions and clean them
        const suggestions = suggestionsText
          .split('|')
          .map(s => s.trim())
          .map(s => s.replace(/^["']|["']$/g, '')) // Remove quotes
          .filter(s => s.length > 0)
          .slice(0, 4); // Max 4 suggestions

        const emotionalState = (stateMatch?.[1].toLowerCase() || 'nervous') as any;

        return { response, suggestions, emotionalState };
      }
    } catch (error) {
      console.warn('Failed to parse structured response, using fallback');
    }

    // Fallback: treat entire content as response, generate generic suggestions
    return {
      response: content,
      suggestions: this.getFallbackSuggestions(),
      emotionalState: 'nervous'
    };
  }

  /**
   * Generate fallback suggestions based on current state
   */
  private getFallbackSuggestions(): string[] {
    const state = this.currentState.getState();
    const suggestions: string[] = [];

    // Generic interrogation tactics
    if (state.stats.stress < 50) {
      suggestions.push("Press harder on the timeline");
    } else {
      suggestions.push("Take a softer approach");
    }

    // Evidence-based suggestions
    const unpresentedEvidence = state.allEvidence.filter(e => !e.presented);
    if (unpresentedEvidence.length > 0) {
      suggestions.push(`Present evidence: ${unpresentedEvidence[0].name}`);
    }

    // Generic follow-ups based on suspect
    const suspectFirstName = this.currentSuspect.split(' ')[0];
    suggestions.push(`Ask about their relationship with Elias`);
    suggestions.push(`Question their alibi details`);

    return suggestions.slice(0, 3);
  }

  /**
   * Present evidence to current suspect
   */
  async presentEvidence(
    evidenceId: string,
    customQuestion?: string
  ): Promise<{
    response: string;
    suggestions: string[];
    emotionalState: string;
    stats: { stress: number; trust: number; lies: number; contradictions: number };
    tokens: { input: number; output: number };
  }> {
    const evidence = this.currentState.getState().allEvidence.find(e => e.id === evidenceId);
    if (!evidence) {
      throw new Error(`Evidence not found: ${evidenceId}`);
    }

    const suspectFirstName = this.currentSuspect.split(' ')[0];
    const question = customQuestion || `I have ${evidence.name} here. ${evidence.description}. What do you have to say about this?`;

    return this.askHarper(question, evidenceId);
  }

  /**
   * Get current interrogation state
   */
  getState() {
    return this.currentState.getState();
  }

  /**
   * Reset interrogation for current suspect
   */
  reset() {
    const suspectId = this.getSuspectId(this.currentSuspect);
    resetSuspectState(suspectId);
    this.currentState = this.loadSuspectState(this.currentSuspect);
    console.log(`✅ Interrogation reset for ${this.currentSuspect}`);
  }

  /**
   * Get conversation history formatted for display
   */
  getConversationHistory() {
    return this.currentState.getState().conversationHistory;
  }

  /**
   * Update stats manually (for testing)
   */
  updateStats(changes: { stress?: number; trust?: number; lies?: number; contradictions?: number }) {
    this.currentState.updateStats(changes);
  }
}

// Singleton instance
let interrogationControllerInstance: InterrogationController | null = null;

/**
 * Get or create interrogation controller singleton
 */
export function getInterrogationController(apiKey?: string, suspectName?: SuspectName): InterrogationController {
  if (!interrogationControllerInstance) {
    interrogationControllerInstance = new InterrogationController(apiKey, suspectName);
  } else if (suspectName) {
    interrogationControllerInstance.setSuspect(suspectName);
  }
  return interrogationControllerInstance;
}

/**
 * Initialize interrogation system
 */
export async function initializeInterrogation(apiKey?: string, suspectName?: SuspectName): Promise<boolean> {
  try {
    const controller = getInterrogationController(apiKey, suspectName);
    console.log('✅ Interrogation system ready');
    return true;
  } catch (error) {
    console.error('❌ Failed to initialize interrogation system:', error);
    return false;
  }
}
