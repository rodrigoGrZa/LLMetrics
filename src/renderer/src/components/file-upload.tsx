import React from 'react';
import * as XLSX from 'xlsx';

interface Props {
    onInputsLoaded: (inputs: string[]) => void;
}

const FileUpload: React.FC<Props> = ({ onInputsLoaded }) => {
    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);
        const inputs = jsonData.map((row) => Object.values(row)[0]?.toString() || '');
        onInputsLoaded(inputs);
    };

    return (
        <div className="flex flex-col gap-2 bg-zinc-900 text-white p-4 rounded-2xl shadow-md">
            <label className="text-lg font-medium">📁 Upload Excel File</label>
            <input
                type="file"
                accept=".xlsx"
                onChange={handleFile}
                className="file:bg-zinc-800 file:text-white file:border file:border-zinc-700 file:rounded px-2 py-1"
            />
        </div>
    );
};

export default FileUpload;
