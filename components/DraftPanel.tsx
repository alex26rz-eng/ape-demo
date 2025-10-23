interface DraftPanelProps {
  outline: any[];
  paragraphs: any[];
  onNext: () => void;
}

export default function DraftPanel({ outline, paragraphs, onNext }: DraftPanelProps) {
  return (
    <div className="border rounded-lg p-6 bg-white shadow space-y-4">
      <h2 className="text-2xl font-semibold">Draft Outline & Sample Text</h2>
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Outline</h3>
        <ul className="list-disc pl-6 space-y-1">
          {outline && outline.length > 0 ? (
            outline.map((item, idx) => <li key={idx}>{item}</li>)
          ) : (
            <li className="text-gray-500">No outline available.</li>
          )}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Sample Paragraphs</h3>
        <ul className="list-disc pl-6 space-y-4">
          {paragraphs && paragraphs.length > 0 ? (
            paragraphs.map((para, idx) => <li key={idx}>{para}</li>)
          ) : (
            <li className="text-gray-500">No sample paragraphs.</li>
          )}
        </ul>
      </div>
      <div className="text-right">
        <button
          onClick={onNext}
          className="bg-accent text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
