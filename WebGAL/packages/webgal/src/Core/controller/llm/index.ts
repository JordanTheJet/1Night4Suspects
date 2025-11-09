/**
 * LLM Interrogation System
 * Main exports for Claude-powered dynamic interrogations
 */

export { ClaudeClient, getClaudeClient } from './claudeClient';
export type { ClaudeMessage, ClaudeResponse } from './claudeClient';

export { HarperInterrogationState, getHarperState, resetHarperState } from './interrogationState';
export type { SuspectStats, ConversationTurn, EvidenceItem, InterrogationState } from './interrogationState';

export { buildHarperSystemPrompt, buildHarperDemoPrompt } from './harperPrompt';

export { InterrogationController, getInterrogationController, initializeInterrogation } from './interrogationController';
