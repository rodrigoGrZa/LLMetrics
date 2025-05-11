import React, { useState } from 'react';

interface Props {
    prompts: string[];
    setPrompts: (prompts: string[]) => void;
    variables: Record<string, string[]>;
    setVariables: (vars: Record<string, string[]>) => void;
}

const PromptEditor: React.FC<Props> = ({ prompts, setPrompts, variables, setVariables }) => {
    const [newVarName, setNewVarName] = useState('');
    const [editVarKey, setEditVarKey] = useState<string | null>(null);
    const [editVarValue, setEditVarValue] = useState('');

    const handleChange = (index: number, value: string) => {
        const newPrompts = [...prompts];
        newPrompts[index] = value;
        setPrompts(newPrompts);
    };

    const addPrompt = () => setPrompts([...prompts, '']);

    const removePrompt = (index: number) => {
        const updated = [...prompts];
        updated.splice(index, 1);
        setPrompts(updated);
    };

    const handleAddVariable = () => {
        const key = newVarName.trim();
        if (!key || variables[key]) return;
        setVariables({ ...variables, [key]: [] });
        setNewVarName('');
    };

    const handleSaveEdit = () => {
        if (!editVarKey) return;
        const values = editVarValue
            .split(',')
            .map((v) => v.trim())
            .filter(Boolean);
        setVariables({ ...variables, [editVarKey]: values });
        setEditVarKey(null);
        setEditVarValue('');
    };

    const handleRemoveVariable = (key: string) => {
        const updated = { ...variables };
        delete updated[key];
        setVariables(updated);
    };

    return (
        <div className="bg-zinc-900 text-white p-4 rounded-2xl shadow-md space-y-4">
            <h3 className="text-lg font-semibold">✏️ Prompts</h3>

            {prompts.map((prompt, i) => (
                <div key={i} className="flex gap-2 items-start">
                    <textarea
                        value={prompt}
                        onChange={(e) => handleChange(i, e.target.value)}
                        placeholder={`Prompt ${i + 1}`}
                        className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={() => removePrompt(i)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded h-fit mt-1"
                    >
                        ✕
                    </button>
                </div>
            ))}

            <button
                onClick={addPrompt}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-white"
            >
                + Add Prompt
            </button>

            <div className="pt-4">
                <h4 className="text-md font-semibold">🔁 Custom Variables</h4>
                <p className="text-sm text-zinc-400">
                    You can use them in prompts as <code>{'{'}{'{nombre}'}{'}'}</code>
                </p>

                <div className="flex gap-2 mt-2">
                    <input
                        value={newVarName}
                        onChange={(e) => setNewVarName(e.target.value)}
                        placeholder="New variable name"
                        className="bg-zinc-800 border border-zinc-700 px-2 py-1 rounded w-full"
                    />
                    <button
                        onClick={handleAddVariable}
                        className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white"
                    >
                        + Add
                    </button>
                </div>

                <ul className="mt-4 space-y-2">
                    {Object.entries(variables).map(([key, values]) => (
                        <li key={key} className="bg-zinc-800 p-2 rounded flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <span>
                                    <code className="text-blue-300">{`{{${key}}}`}</code> → [{values.join(', ')}]
                                </span>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => {
                                            setEditVarKey(key);
                                            setEditVarValue(values.join(', '));
                                        }}
                                        className="text-sm bg-yellow-500 hover:bg-yellow-600 text-black px-2 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleRemoveVariable(key)}
                                        className="text-sm bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {editVarKey === key && (
                                <div className="flex flex-col gap-2">
                                    <input
                                        value={editVarValue}
                                        onChange={(e) => setEditVarValue(e.target.value)}
                                        placeholder="Comma-separated values"
                                        className="bg-zinc-700 border border-zinc-600 px-2 py-1 rounded"
                                    />
                                    <button
                                        onClick={handleSaveEdit}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded self-start"
                                    >
                                        Save
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PromptEditor;
