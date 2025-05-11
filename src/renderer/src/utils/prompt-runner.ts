import { Result } from "../types";
import { delay } from "./utils";

interface RunParams {
  inputs: string[];
  prompts: string[];
  repeatCount: number;
  executionMode: "parallel" | "sequential";
  delaySeconds: number;
  apiKey: string;
  selectedModel: string;
  mode: "openai" | "lmstudio";
}

export async function processPrompts({
  inputs,
  prompts,
  repeatCount,
  executionMode,
  delaySeconds,
  apiKey,
  selectedModel,
  mode,
}: RunParams): Promise<Result[]> {
  const allResults: Result[] = [];

  const callPrompt = async (input: string, promptTemplate: string): Promise<Result> => {
    const prompt = promptTemplate.replace(/{{input}}/g, input);
    const start = performance.now();

    const json = await window.electronAPI.callLLM({
      prompt,
      selectedModel,
      mode,
      apiKey,
    });

    const end = performance.now();

    const usage = json.usage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 };
    const output = json.choices?.[0]?.message?.content || "[No Response]";

    return {
      input,
      prompt,
      output,
      timeSeconds: Number(((end - start) / 1000).toFixed(2)),
      inputTokens: usage.prompt_tokens,
      outputTokens: usage.completion_tokens,
      totalTokens: usage.total_tokens,
    };
  };

  const runSequential = async () => {
    for (const input of inputs) {
      for (const prompt of prompts) {
        for (let i = 0; i < repeatCount; i++) {
          const result = await callPrompt(input, prompt);
          allResults.push(result);
          if (delaySeconds > 0) await delay(delaySeconds * 1000);
        }
      }
    }
  };

  const runParallel = async () => {
    const tasks: Promise<Result>[] = [];
    for (const input of inputs) {
      for (const prompt of prompts) {
        for (let i = 0; i < repeatCount; i++) {
          tasks.push(callPrompt(input, prompt));
        }
      }
    }
    const results = await Promise.all(tasks);
    allResults.push(...results);
  };

  if (executionMode === "sequential") {
    await runSequential();
  } else {
    await runParallel();
  }

  return allResults;
}
