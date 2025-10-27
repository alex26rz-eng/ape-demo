import { useState } from 'react';

export default function Demo() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading'>('idle');

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Only PDF files are accepted.');
      return;
    }

    setFileName(file.name);
    setStatus('uploading');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      {status === 'idle' && (
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">Upload RFP</h1>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleUpload}
            className="p-2 border rounded"
          />
          <button
            onClick={() => setStatus('uploading')}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Use Demo
          </button>
          <p className="text-gray-500 text-sm">
            DEMO_MODE is on: using sample RFP.
          </p>
        </div>
      )}

      {status === 'uploading' && (
        <div className="space-y-3 animate-pulse">
          <h2 className="text-xl font-semibold">Analyzing RFP…</h2>
          <p className="text-gray-600">
            {fileName ? `Processing ${fileName}` : 'Preparing analysis'}
          </p>
          <p className="text-gray-500 text-sm">
            This may take several minutes as our AI reviews compliance, scoring and structure.
          </p>
        </div>
      )}
    </div>
  );
}
