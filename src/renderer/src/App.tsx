import { useState } from 'react';
import FileUpload from './components/file-upload';
import PromptEditor from './components/prompt-editor';
import ExecutionConfig from './components/execution-config';
import ResultsTable from './components/reults-table';
import ExportButton from './components/export-button';
import ModelSelector from './components/model-selector';
import { processPrompts } from './utils/prompt-runner';
import { Result } from './types';

function App() {
  const [inputs, setInputs] = useState<string[]>([]);
  const [prompts, setPrompts] = useState<string[]>([]);
  const [repeatCount, setRepeatCount] = useState<number>(1);
  const [executionMode, setExecutionMode] = useState<'parallel' | 'sequential'>('sequential');
  const [delaySeconds, setDelaySeconds] = useState<number>(0);
  const [apiKey, setApiKey] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('gpt-4');
  const [mode, setMode] = useState<'openai' | 'lmstudio'>('openai');
  const [results, setResults] = useState<Result[]>([]);
  const [variables, setVariables] = useState<Record<string, string[]>>({});

  const handleRun = async () => {
    const res = await processPrompts({
      inputs,
      prompts,
      repeatCount,
      executionMode,
      delaySeconds,
      apiKey,
      selectedModel,
      mode,
      variables
    });
    setResults(res);
    await window.electronAPI.saveJSON(res);
  };

  return (
    <div className="p-4 space-y-4 bg-zinc-950 min-h-screen text-white">
      <FileUpload onInputsLoaded={setInputs} />
      <PromptEditor
        prompts={prompts}
        setPrompts={setPrompts}
        variables={variables}
        setVariables={setVariables}
      />
      <ModelSelector
        selectedModel={selectedModel}
        apiKey={apiKey}
        setApiKey={setApiKey}
        setSelectedModel={setSelectedModel}
        mode={mode}
        setMode={setMode}
      />
      <ExecutionConfig
        repeatCount={repeatCount}
        setRepeatCount={setRepeatCount}
        executionMode={executionMode}
        setExecutionMode={setExecutionMode}
        delaySeconds={delaySeconds}
        setDelaySeconds={setDelaySeconds}
        onRun={handleRun}
      />
      <ResultsTable results={results} />
      <ExportButton results={results} />
    </div>
  );
}

export default App;
