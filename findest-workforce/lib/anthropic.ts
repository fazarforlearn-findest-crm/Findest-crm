import Anthropic from "@anthropic-ai/sdk";

let cached: Anthropic | null = null;

export function getAnthropic(): Anthropic {
  if (cached) return cached;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not set. Copy .env.example to .env.local and fill it in.");
  }
  cached = new Anthropic({ apiKey });
  return cached;
}

const PRICING: Record<string, { input: number; output: number }> = {
  "claude-sonnet-5": { input: 3.0, output: 15.0 },
  "claude-haiku-4-5-20251001": { input: 1.0, output: 5.0 },
};

export function estimateCostUsd(model: string, inputTokens: number, outputTokens: number): number {
  const rate = PRICING[model] ?? PRICING["claude-sonnet-5"];
  return (inputTokens * rate.input + outputTokens * rate.output) / 1_000_000;
}
