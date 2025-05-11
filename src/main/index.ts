import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import fs from "fs";

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
    },
  });

  win.loadURL("http://localhost:5173");
  win.webContents.openDevTools();

  ipcMain.handle("save-json", async (_, data) => {
    const appDataPath = path.join(app.getPath("appData"), "PromptApp");
    if (!fs.existsSync(appDataPath)) fs.mkdirSync(appDataPath);
    const filePath = path.join(appDataPath, "results.json");
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return filePath;
  });

  ipcMain.handle("load-json", async () => {
    const filePath = path.join(app.getPath("appData"), "PromptApp", "results.json");
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
    return null;
  });

  ipcMain.handle("get-models", async (_, mode: "openai" | "lmstudio") => {
    if (mode === "lmstudio") {
      try {
        const res = await fetch("http://localhost:1234/v1/models");
        const json = await res.json();
        const modelIds = json.data?.map((m: any) => m.id) || [];
        return modelIds;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        return [];
      }
    } else {
      return ["gpt-4", "gpt-3.5-turbo"];
    }
  });

  ipcMain.handle("call-llm", async (_, { prompt, selectedModel, mode, apiKey }) => {
    const url =
      mode === "openai"
        ? "https://api.openai.com/v1/chat/completions"
        : "http://localhost:1234/v1/chat/completions";

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (mode === "openai") headers["Authorization"] = `Bearer ${apiKey}`;

    const body = {
      model: selectedModel,
      messages: [{ role: "user", content: prompt }],
    };

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const json = await res.json();
    return json;
  });
}

app.whenReady().then(createWindow);
