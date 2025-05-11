import React from 'react';
import { Result } from '../types';

interface Props {
    results: Result[];
}

const ResultsTable: React.FC<Props> = ({ results }) => {
    if (results.length === 0) return <p className="text-gray-400">No results yet.</p>;

    return (
        <div className="overflow-auto rounded-2xl shadow-md bg-zinc-900 mt-4">
            <table className="w-full text-sm text-left text-gray-200">
                <thead className="bg-zinc-800 uppercase text-xs text-gray-400">
                    <tr>
                        <th className="px-4 py-2">Input</th>
                        <th className="px-4 py-2">Prompt</th>
                        <th className="px-4 py-2">Output</th>
                        <th className="px-4 py-2">Time (s)</th>
                        <th className="px-4 py-2">Input Tokens</th>
                        <th className="px-4 py-2">Output Tokens</th>
                        <th className="px-4 py-2">Total Tokens</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((r, i) => (
                        <tr key={i} className="border-t border-zinc-800">
                            <td className="px-4 py-2">{r.input}</td>
                            <td className="px-4 py-2 whitespace-pre-wrap">{r.prompt}</td>
                            <td className="px-4 py-2 whitespace-pre-wrap">{r.output}</td>
                            <td className="px-4 py-2">{r.timeSeconds}</td>
                            <td className="px-4 py-2">{r.inputTokens}</td>
                            <td className="px-4 py-2">{r.outputTokens}</td>
                            <td className="px-4 py-2">{r.totalTokens}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultsTable;
