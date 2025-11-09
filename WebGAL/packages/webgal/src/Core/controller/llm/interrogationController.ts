import { ClaudeClient, ClaudeMessage, getClaudeClient } from './claudeClient';
import { HarperInterrogationState, getHarperState, resetHarperState } from './interrogationState';
import { buildHarperSystemPrompt } from './harperPrompt';

/**
 * Main controller for LLM-powered interrogations
 */
export class InterrogationController {
  private claudeClient: ClaudeClient;
  private harperState: HarperInterrogationState;

  constructor(apiKey?: string) {
    this.claudeClient = getClaudeClient(apiKey);
    this.harperState = getHarperState();
    console.log('✅ Interrogation Controller initialized');
  }

  /**
   * Ask Harper a question and get dynamic response with suggested follow-up questions
   */
  async askHarper(
    question: string,
    evidenceId?: string,
    onStream?: (chunk: string) => void
  ): Promise<{
    response: string;
    suggestions: string[];
    emotionalState: 'calm' | 'nervous' | 'defensive' | 'angry' | 'breaking';
    stats: { stress: number; trust: number; lies: number; contradictions: number };
    tokens: { input: number; output: number };
  }> {
    try {
      // Add detective's question to conversation history
      this.harperState.addTurn('detective', question, evidenceId);

      // If evidence was presented, mark it
      if (evidenceId) {
        this.harperState.presentEvidence(evidenceId);
      }

      // Get current state
      const state = this.harperState.getState();

      // Build system prompt with current context - includes instruction for suggestions
      const systemPrompt = buildHarperSystemPrompt(state, true); // true = include suggestions

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
      this.harperState.parseStatChanges(parsed.response);

      // Clean response (remove stat change markers)
      const cleanedResponse = parsed.response
        .replace(/\[([+-])(stress|trust):\d+\]/g, '')
        .trim();

      // Add Harper's response to history
      this.harperState.addTurn('suspect', cleanedResponse);

      // Return response with suggestions and updated stats
      const updatedState = this.harperState.getState();
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
    emotionalState: 'calm' | 'nervous' | 'defensive' | 'angry' | 'breaking';
  } {
    try {
      // Try to parse structured format
      const responseMatch = content.match(/RESPONSE:\s*(.+?)(?=\s*\|\s*SUGGESTIONS:|\s*$)/s);
      const suggestionsMatch = content.match(/SUGGESTIONS:\s*(.+?)(?=\s*\|\s*STATE:|\s*$)/s);
      const stateMatch = content.match(/STATE:\s*(\w+)/);

      if (responseMatch && suggestionsMatch) {
        const response = responseMatch[1].trim();
        const suggestionsText = suggestionsMatch[1].trim();
        const suggestions = suggestionsText
          .split('|')
          .map(s => s.trim())
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
    const state = this.harperState.getState();
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

    // Generic follow-ups
    suggestions.push("Ask about her relationship with Elias");
    suggestions.push("Question her alibi details");

    return suggestions.slice(0, 3);
  }

  /**
   * Present evidence to Harper
   */
  async presentEvidence(
    evidenceId: string,
    customQuestion?: string
  ): Promise<{
    response: string;
    stats: { stress: number; trust: number; lies: number; contradictions: number };
  }> {
    const evidence = this.harperState.getState().allEvidence.find(e => e.id === evidenceId);
    if (!evidence) {
      throw new Error(`Evidence not found: ${evidenceId}`);
    }

    const question = customQuestion || `I have ${evidence.name} here. ${evidence.description}. What do you have to say about this?`;

    return this.askHarper(question, evidenceId);
  }

  /**
   * Get current interrogation state
   */
  getState() {
    return this.harperState.getState();
  }

  /**
   * Reset interrogation (for demo restart)
   */
  reset() {
    resetHarperState();
    this.harperState = getHarperState();
    console.log('✅ Interrogation reset');
  }

  /**
   * Get conversation history formatted for display
   */
  getConversationHistory() {
    return this.harperState.getState().conversationHistory;
  }

  /**
   * Update stats manually (for testing)
   */
  updateStats(changes: { stress?: number; trust?: number; lies?: number; contradictions?: number }) {
    this.harperState.updateStats(changes);
  }
}

// Singleton instance
let interrogationControllerInstance: InterrogationController | null = null;

/**
 * Get or create interrogation controller singleton
 */
export function getInterrogationController(apiKey?: string): InterrogationController {
  if (!interrogationControllerInstance) {
    interrogationControllerInstance = new InterrogationController(apiKey);
  }
  return interrogationControllerInstance;
}

/**
 * Initialize interrogation system
 */
export async function initializeInterrogation(apiKey?: string): Promise<boolean> {
  try {
    const controller = getInterrogationController(apiKey);
    console.log('✅ Interrogation system ready');
    return true;
  } catch (error) {
    console.error('❌ Failed to initialize interrogation system:', error);
    return false;
  }
}
