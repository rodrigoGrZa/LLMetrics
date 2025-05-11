import React from 'react';
import * as XLSX from 'xlsx';
import { Result } from '../types';

interface Props {
    results: Result[];
}

const ExportButton: React.FC<Props> = ({ results }) => {
    const handleExport = () => {
        const data = results.map(r => ({
            Input: r.input,
            Prompt: r.prompt,
            Output: r.output,
            'Time (s)': r.timeSeconds,
            'Input Tokens': r.inputTokens,
            'Output Tokens': r.outputTokens,
            'Total Tokens': r.totalTokens,
        }));
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Results');
        XLSX.writeFile(workbook, 'results.xlsx');
    };

    return (
        <div className="mt-4">
            <button
                onClick={handleExport}
                disabled={results.length === 0}
                className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded text-white font-semibold disabled:opacity-50"
            >
                💾 Export to Excel
            </button>
        </div>
    );
};

export default ExportButton;
