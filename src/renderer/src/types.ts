export interface Result {
  input: string;
  prompt: string;
  output: string;
  timeSeconds: number;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
}
