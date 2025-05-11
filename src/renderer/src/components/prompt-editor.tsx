import React from 'react';

interface Props {
    prompts: string[];
    setPrompts: (prompts: string[]) => void;
}

const PromptEditor: React.FC<Props> = ({ prompts, setPrompts }) => {
    const handleChange = (index: number, value: string) => {
        const newPrompts = [...prompts];
        newPrompts[index] = value;
        setPrompts(newPrompts);
    };

    const addPrompt = () => setPrompts([...prompts, '']);

    return (
        <div className="bg-zinc-900 text-white p-4 rounded-2xl shadow-md space-y-2">
            <h3 className="text-lg font-semibold">✏️ Prompts</h3>
            {prompts.map((prompt, i) => (
                <textarea
                    key={i}
                    value={prompt}
                    onChange={(e) => handleChange(i, e.target.value)}
                    placeholder={`Prompt ${i + 1}`}
                    className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            ))}
            <button
                onClick={addPrompt}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-white mt-2"
            >
                + Add Prompt
            </button>
        </div>
    );
};

export default PromptEditor;
