interface PredictorCardProps {
  predictor: any;
}

export default function PredictorCard({ predictor }: PredictorCardProps) {
  return (
    <div className="border rounded-lg p-6 bg-white shadow flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4">Award Prediction</h2>
      {predictor ? (
        <div className="space-y-2">
          <p>Best-Value Score: {predictor.best_value_score ?? 'N/A'}</p>
          <p>LPTA Score: {predictor.lpta_score ?? 'N/A'}</p>
          <p>Recommended Approach: {predictor.recommended ?? 'N/A'}</p>
        </div>
      ) : (
        <p className="text-gray-500">No prediction data.</p>
      )}
      <div className="mt-6">
        <a href="/" className="bg-accent text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
          Back to Home
        </a>
      </div>
    </div>
  );
}
