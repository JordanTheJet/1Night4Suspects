/**
 * Interrogation State Manager
 * Tracks conversation history, evidence, and suspect stats for LLM context
 */

export interface SuspectStats {
  stress: number;      // 0-100: How pressured the suspect feels
  trust: number;       // 0-100: How much the suspect trusts the detective
  lies: number;        // Count of lies told
  contradictions: number; // Count of caught contradictions
}

export interface ConversationTurn {
  speaker: 'detective' | 'suspect';
  text: string;
  timestamp: number;
  evidencePresented?: string;
}

export interface EvidenceItem {
  id: string;
  name: string;
  description: string;
  presented: boolean;
  suspectReaction?: string;
}

export interface InterrogationState {
  suspectId: 'harper' | 'marcus' | 'rowan';
  stats: SuspectStats;
  conversationHistory: ConversationTurn[];
  evidencePresented: string[];
  allEvidence: EvidenceItem[];
  flags: Record<string, boolean>; // Track story flags (e.g., "harper_mentioned_dock": true)
  gameContext: {
    timeRemaining: string; // e.g., "4 hours until dawn"
    otherSuspectsQuestioned: string[];
    currentLocation: string;
  };
}

/**
 * State Manager for Harper's interrogation
 */
export class HarperInterrogationState {
  private state: InterrogationState;

  constructor() {
    this.state = this.initializeState();
  }

  private initializeState(): InterrogationState {
    return {
      suspectId: 'harper',
      stats: {
        stress: 35,
        trust: 25,
        lies: 0,
        contradictions: 0
      },
      conversationHistory: [],
      evidencePresented: [],
      allEvidence: [
        {
          id: 'broken_wineglass',
          name: 'Broken Wineglass',
          description: 'Shattered glass near fireplace with Harper\'s lipstick shade',
          presented: false
        },
        {
          id: 'unsent_texts',
          name: 'Unsent Text Messages',
          description: 'Harper\'s phone, 11:47 PM, vengeful messages never sent to Elias',
          presented: false
        },
        {
          id: 'insurance_policy',
          name: 'Life Insurance Policy',
          description: '2 million dollar policy, Harper is 40% beneficiary',
          presented: false
        },
        {
          id: 'dock_timeline',
          name: 'Security Timeline',
          description: 'Harper seen at dock at 11:15 PM, not in her room as claimed',
          presented: false
        }
      ],
      flags: {},
      gameContext: {
        timeRemaining: '4 hours until dawn',
        otherSuspectsQuestioned: [],
        currentLocation: 'interrogation_room'
      }
    };
  }

  /**
   * Add a conversation turn to history
   */
  addTurn(speaker: 'detective' | 'suspect', text: string, evidenceId?: string): void {
    this.state.conversationHistory.push({
      speaker,
      text,
      timestamp: Date.now(),
      evidencePresented: evidenceId
    });

    // Keep only last 10 turns for context (to avoid token limit)
    if (this.state.conversationHistory.length > 10) {
      this.state.conversationHistory = this.state.conversationHistory.slice(-10);
    }
  }

  /**
   * Present evidence to suspect
   */
  presentEvidence(evidenceId: string): void {
    if (!this.state.evidencePresented.includes(evidenceId)) {
      this.state.evidencePresented.push(evidenceId);
    }

    const evidence = this.state.allEvidence.find(e => e.id === evidenceId);
    if (evidence) {
      evidence.presented = true;
    }
  }

  /**
   * Update suspect stats
   */
  updateStats(changes: Partial<SuspectStats>): void {
    if (changes.stress !== undefined) {
      this.state.stats.stress = Math.max(0, Math.min(100, this.state.stats.stress + changes.stress));
    }
    if (changes.trust !== undefined) {
      this.state.stats.trust = Math.max(0, Math.min(100, this.state.stats.trust + changes.trust));
    }
    if (changes.lies !== undefined) {
      this.state.stats.lies += changes.lies;
    }
    if (changes.contradictions !== undefined) {
      this.state.stats.contradictions += changes.contradictions;
    }
  }

  /**
   * Set a story flag
   */
  setFlag(key: string, value: boolean): void {
    this.state.flags[key] = value;
  }

  /**
   * Get current state
   */
  getState(): InterrogationState {
    return { ...this.state };
  }

  /**
   * Get conversation history formatted for LLM context
   */
  getConversationContext(): string {
    if (this.state.conversationHistory.length === 0) {
      return 'No previous conversation.';
    }

    return this.state.conversationHistory
      .map(turn => {
        const label = turn.speaker === 'detective' ? 'Detective' : 'Harper';
        const evidence = turn.evidencePresented ? ` [Presented evidence: ${turn.evidencePresented}]` : '';
        return `${label}: ${turn.text}${evidence}`;
      })
      .join('\n');
  }

  /**
   * Get evidence context for LLM
   */
  getEvidenceContext(): string {
    const presented = this.state.allEvidence.filter(e => e.presented);
    if (presented.length === 0) {
      return 'No evidence has been presented yet.';
    }

    return 'Evidence presented to suspect:\n' +
      presented.map(e => `- ${e.name}: ${e.description}`).join('\n');
  }

  /**
   * Get stats formatted for LLM context
   */
  getStatsContext(): string {
    const { stress, trust, lies, contradictions } = this.state.stats;
    return `Stress: ${stress}/100, Trust: ${trust}/100, Lies told: ${lies}, Contradictions caught: ${contradictions}`;
  }

  /**
   * Parse LLM response for stat changes
   * Looks for patterns like [+stress:10] or [-trust:5]
   */
  parseStatChanges(response: string): void {
    const stressMatch = response.match(/\[([+-])stress:(\d+)\]/);
    const trustMatch = response.match(/\[([+-])trust:(\d+)\]/);

    if (stressMatch) {
      const change = parseInt(stressMatch[2]) * (stressMatch[1] === '+' ? 1 : -1);
      this.updateStats({ stress: change });
    }

    if (trustMatch) {
      const change = parseInt(trustMatch[2]) * (trustMatch[1] === '+' ? 1 : -1);
      this.updateStats({ trust: change });
    }
  }

  /**
   * Reset state (for testing/demo)
   */
  reset(): void {
    this.state = this.initializeState();
  }

  /**
   * Export state to JSON (for saving/loading)
   */
  export(): string {
    return JSON.stringify(this.state);
  }

  /**
   * Import state from JSON
   */
  import(json: string): void {
    try {
      this.state = JSON.parse(json);
    } catch (error) {
      console.error('Failed to import state:', error);
    }
  }
}

// Singleton instance
let harperStateInstance: HarperInterrogationState | null = null;

/**
 * Get or create Harper state singleton
 */
export function getHarperState(): HarperInterrogationState {
  if (!harperStateInstance) {
    harperStateInstance = new HarperInterrogationState();
  }
  return harperStateInstance;
}

/**
 * Reset Harper state (useful for demo restarts)
 */
export function resetHarperState(): void {
  if (harperStateInstance) {
    harperStateInstance.reset();
  } else {
    harperStateInstance = new HarperInterrogationState();
  }
}
