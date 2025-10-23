interface UploadCardProps {
  onNext: () => void;
}

export default function UploadCard({ onNext }: UploadCardProps) {
  return (
    <div className="border rounded-lg p-6 flex flex-col items-center space-y-4 bg-white shadow">
      <h2 className="text-2xl font-semibold">Upload RFP</h2>
      <input type="file" className="border p-2" disabled />
      <button
        onClick={onNext}
        className="bg-accent text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        Use Demo
      </button>
      <p className="text-sm text-gray-500">DEMO_MODE is on: using sample RFP.</p>
    </div>
  );
}
