import React, { useEffect, useState } from 'react';

interface Props {
    selectedModel: string;
    setSelectedModel: (model: string) => void;
    mode: 'openai' | 'lmstudio';
    setMode: (mode: 'openai' | 'lmstudio') => void;
    apiKey: string;
    setApiKey: (key: string) => void;
}

const ModelSelector: React.FC<Props> = ({
    selectedModel,
    setSelectedModel,
    mode,
    setMode,
    apiKey,
    setApiKey
}) => {
    const [availableModels, setAvailableModels] = useState<string[]>([]);
    const [testOutput, setTestOutput] = useState<string>('');
    const [loadingTest, setLoadingTest] = useState(false);

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const models = await window.electronAPI.getModels(mode);
                setAvailableModels(models);
                if (!models.includes(selectedModel)) {
                    setSelectedModel(models[0] || '');
                }
            } catch {
                setAvailableModels([]);
            }
        };

        fetchModels();
    }, [mode]);

    const testModel = async () => {
        setLoadingTest(true);
        setTestOutput('');
        try {
            const result = await window.electronAPI.callLLM({
                prompt: 'Hi this is a test',
                selectedModel,
                mode,
                apiKey
            });
            const content = result.choices?.[0]?.message?.content || '[Sin respuesta]';
            setTestOutput(content);
        } catch (err) {
            setTestOutput('❌ Error al probar el modelo ' + err);
        } finally {
            setLoadingTest(false);
        }
    };

    return (
        <div className="bg-zinc-900 text-white p-4 rounded-2xl shadow-md space-y-4">
            <h3 className="text-lg font-semibold">🧠 Model Selector</h3>

            <div className="flex gap-4">
                <button
                    onClick={() => setMode('openai')}
                    className={`px-4 py-1 rounded transition ${mode === 'openai' ? 'bg-blue-600' : 'bg-zinc-800 hover:bg-zinc-700'
                        }`}
                >
                    OpenAI
                </button>
                <button
                    onClick={() => setMode('lmstudio')}
                    className={`px-4 py-1 rounded transition ${mode === 'lmstudio' ? 'bg-blue-600' : 'bg-zinc-800 hover:bg-zinc-700'
                        }`}
                >
                    LM Studio
                </button>
            </div>

            {mode === 'openai' && (
                <div>
                    <label className="block mb-1">🔑 API Key</label>
                    <input
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
                    />
                </div>
            )}

            <div>
                <label className="block mb-1">📦 Select Model</label>
                <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
                >
                    {availableModels.length === 0 ? (
                        <option disabled>No models found</option>
                    ) : (
                        availableModels.map((model) => <option key={model}>{model}</option>)
                    )}
                </select>
            </div>

            <button
                onClick={testModel}
                className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded text-white"
                disabled={loadingTest || !selectedModel}
            >
                🔍 Test Model
            </button>

            {loadingTest && (
                <div className="flex items-center gap-2">
                    <span className="loader"></span>
                    <span>Testing...</span>
                </div>
            )}

            {testOutput && (
                <div className="bg-zinc-800 p-3 mt-2 rounded whitespace-pre-wrap text-sm border border-zinc-700">
                    <strong>Response:</strong>
                    <div>{testOutput}</div>
                </div>
            )}
        </div>
    );
};

export default ModelSelector;
