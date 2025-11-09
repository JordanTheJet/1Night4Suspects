import Anthropic from '@anthropic-ai/sdk';

// Claude Haiku 3.5 model configuration (current stable version)
const MODEL = 'claude-3-5-haiku-20241022';
const MAX_TOKENS = 8000; // Increased for detailed responses and suggestions
const TEMPERATURE = 0.7;
const TIMEOUT_MS = 30000; // Increased timeout for longer responses

export interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ClaudeResponse {
  content: string;
  stopReason: string | null;
  usage: {
    inputTokens: number;
    outputTokens: number;
  };
}

/**
 * Claude API client for LLM-powered interrogations
 */
export class ClaudeClient {
  private client: Anthropic;
  private apiKey: string;

  constructor(apiKey?: string) {
    // Get API key from parameter or import.meta.env (browser context)
    // Note: process.env doesn't exist in browser, only in Node.js
    this.apiKey = apiKey || (import.meta.env?.VITE_ANTHROPIC_API_KEY as string) || '';

    if (!this.apiKey) {
      console.error('❌ VITE_ANTHROPIC_API_KEY not found in environment');
      throw new Error('VITE_ANTHROPIC_API_KEY is required in .env file');
    }

    this.client = new Anthropic({
      apiKey: this.apiKey,
      dangerouslyAllowBrowser: true, // Required for browser environments
    });

    console.log('✅ Claude client initialized');
  }

  /**
   * Generate suspect response using Claude
   * @param systemPrompt - Character personality and context
   * @param messages - Conversation history
   * @param onStream - Optional callback for streaming responses
   */
  async generateResponse(
    systemPrompt: string,
    messages: ClaudeMessage[],
    onStream?: (chunk: string) => void
  ): Promise<ClaudeResponse> {
    try {
      // Add timeout wrapper
      const responsePromise = this.client.messages.create({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        temperature: TEMPERATURE,
        system: systemPrompt,
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        stream: !!onStream
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Claude API timeout')), TIMEOUT_MS)
      );

      if (onStream) {
        // Streaming mode
        const stream = await Promise.race([responsePromise, timeoutPromise]);
        let fullContent = '';
        let usage = { inputTokens: 0, outputTokens: 0 };

        for await (const event of stream as any) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            const chunk = event.delta.text;
            fullContent += chunk;
            onStream(chunk);
          }
          if (event.type === 'message_delta' && event.usage) {
            usage.outputTokens = event.usage.output_tokens || 0;
          }
          if (event.type === 'message_start' && event.message?.usage) {
            usage.inputTokens = event.message.usage.input_tokens || 0;
          }
        }

        return {
          content: fullContent,
          stopReason: 'end_turn',
          usage
        };
      } else {
        // Non-streaming mode
        const response = await Promise.race([responsePromise, timeoutPromise]) as any;

        return {
          content: response.content[0].text,
          stopReason: response.stop_reason,
          usage: {
            inputTokens: response.usage.input_tokens,
            outputTokens: response.usage.output_tokens
          }
        };
      }
    } catch (error) {
      console.error('❌ Claude API error:', error);
      throw error;
    }
  }

  /**
   * Test connection to Claude API
   */
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.generateResponse(
        'You are a helpful assistant.',
        [{ role: 'user', content: 'Say "test successful" if you can read this.' }]
      );
      console.log('✅ Claude connection test:', response.content);
      return true;
    } catch (error) {
      console.error('❌ Claude connection test failed:', error);
      return false;
    }
  }
}

// Singleton instance
let claudeClientInstance: ClaudeClient | null = null;

/**
 * Get or create Claude client singleton
 */
export function getClaudeClient(apiKey?: string): ClaudeClient {
  if (!claudeClientInstance) {
    claudeClientInstance = new ClaudeClient(apiKey);
  }
  return claudeClientInstance;
}
