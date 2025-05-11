import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  saveJSON: (data: any) => ipcRenderer.invoke("save-json", data),
  loadJSON: () => ipcRenderer.invoke("load-json"),
  getModels: (mode: "openai" | "lmstudio") => ipcRenderer.invoke("get-models", mode),
  callLLM: (params: { prompt: string; selectedModel: string; mode: string; apiKey: string }) =>
    ipcRenderer.invoke("call-llm", params),
});
