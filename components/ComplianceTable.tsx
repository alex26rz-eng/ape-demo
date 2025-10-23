interface ComplianceTableProps {
  data: any[];
  onNext: () => void;
}

export default function ComplianceTable({ data, onNext }: ComplianceTableProps) {
  return (
    <div className="border rounded-lg p-6 bg-white shadow">
      <h2 className="text-2xl font-semibold mb-4">Compliance Matrix</h2>
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Requirement</th>
            <th className="py-2 px-4 border-b">Description</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((req, idx) => (
              <tr key={idx} className="odd:bg-gray-50">
                <td className="py-2 px-4 border-b">{req.title}</td>
                <td className="py-2 px-4 border-b">{req.description}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="py-2 text-center text-gray-500">No requirements found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-4 text-right">
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
