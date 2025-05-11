export {};

declare global {
  interface Window {
    electronAPI: {
      saveJSON: (data: any) => Promise<string>;
      loadJSON: () => Promise<any>;
      callLLM: (params: {
        prompt: string;
        selectedModel: string;
        mode: string;
        apiKey: string;
      }) => Promise<any>;
      getModels: (mode: "openai" | "lmstudio") => Promise<string[]>;
    };
  }
}
