# 🖥️ react-electron-starter

A modern **Electron + React + TypeScript + TailwindCSS** boilerplate, focused on simplicity, speed and clean design inspired by Swiss web aesthetics.

This starter provides everything you need to quickly build a sleek and reactive desktop app using the power of Electron and the flexibility of React.

---

## ✨ Features

- ⚛️ **React 18** + **Vite** for lightning-fast HMR
- 🧠 **TypeScript** for type safety across the stack
- 🌈 **TailwindCSS** for styling (with minimalist Swiss layout principles)
- 💡 **Context Bridge** setup via `preload.ts` for safe Electron-Renderer communication
- ⚙️ Fully separated `main`, `preload` and `renderer` processes
- 🛠️ Ready for multiplatform builds (macOS, Windows, Linux)

---

## 📁 Project Structure

```
.
├── main/        → Electron main process (entry point)
├── preload/     → Secure APIs exposed via contextBridge
├── renderer/    → React frontend (with Tailwind + Vite)
├── dist/        → Final built app
├── package.json → Electron + scripts
└── vite.config.ts
```

---

## 🧰 Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

---

## 🚀 Getting Started

### Install dependencies

```bash
npm install
```

### Start in development mode

```bash
npm run dev
```

This launches:

- The Electron app
- A Vite dev server for the React renderer
- Hot reload for both backend and frontend

---

## 🏗️ Build

Build your app for the current platform:

```bash
# For Windows
npm run build:win

# For macOS
npm run build:mac

# For Linux
npm run build:linux
```

Output is generated in the `dist/` directory and includes the bundled application for distribution.

---

## 🔐 Context Bridge Example

You can safely expose APIs from the Electron main/preload to the renderer like this:

### `preload/index.ts`

```ts
import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("electron", {
  getVersions: () => ({
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
  }),
});
```

### `renderer/src/index.d.ts`

```ts
declare global {
  interface Window {
    electron: {
      getVersions: () => {
        node: string;
        chrome: string;
        electron: string;
      };
    };
  }
}
```

## 📜 License

MIT — free to use for personal or commercial projects. Contributions welcome!

---

Made with ❤️ using [Electron](https://www.electronjs.org/), [Vite](https://vitejs.dev/), and [Tailwind](https://tailwindcss.com/)
