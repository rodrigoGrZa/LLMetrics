import React from 'react';

interface Props {
    repeatCount: number;
    setRepeatCount: (n: number) => void;
    executionMode: 'parallel' | 'sequential';
    setExecutionMode: (mode: 'parallel' | 'sequential') => void;
    delaySeconds: number;
    setDelaySeconds: (n: number) => void;
    onRun: () => void;
}

const ExecutionConfig: React.FC<Props> = ({
    repeatCount,
    setRepeatCount,
    executionMode,
    setExecutionMode,
    delaySeconds,
    setDelaySeconds,
    onRun,
}) => {
    return (
        <div className="bg-zinc-900 text-white p-4 rounded-2xl shadow-md space-y-3">
            <h3 className="text-lg font-semibold">⚙️ Execution Settings</h3>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-1">🔁 Repetitions</label>
                    <input
                        type="number"
                        value={repeatCount}
                        onChange={(e) => setRepeatCount(Number(e.target.value))}
                        className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
                    />
                </div>

                <div>
                    <label className="block mb-1">⏱ Delay (seconds)</label>
                    <input
                        type="number"
                        value={delaySeconds}
                        onChange={(e) => setDelaySeconds(Number(e.target.value))}
                        className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
                    />
                </div>
                <div>
                    <label className="block mb-1">🚀 Mode</label>
                    <select
                        value={executionMode}
                        onChange={(e) => setExecutionMode(e.target.value as any)}
                        className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
                    >
                        <option value="sequential">Sequential</option>
                        <option value="parallel">Parallel</option>
                    </select>
                </div>
            </div>

            <button
                onClick={onRun}
                className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded text-white font-semibold"
            >
                ▶️ Run
            </button>
        </div>
    );
};

export default ExecutionConfig;
