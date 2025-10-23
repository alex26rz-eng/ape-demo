import { useState, useEffect } from 'react';
import UploadCard from '../components/UploadCard';
import ComplianceTable from '../components/ComplianceTable';
import DraftPanel from '../components/DraftPanel';
import PredictorCard from '../components/PredictorCard';

const DEMO_MODE = true;

export default function Demo() {
  const [step, setStep] = useState<'upload' | 'compliance' | 'draft' | 'predict'>('upload');
  const [data, setData] = useState<any>(null);

  // Fake load times for realism
  useEffect(() => {
    if (step !== 'upload' && DEMO_MODE && !data) {
      fetch('/demo/rfp.json')
        .then(res => res.json())
        .then(json => {
          setTimeout(() => setData(json), 1000); // 1s delay
        });
    }
  }, [step]);

  return (
    <div className="min-h-screen p-8 space-y-8">
      {step === 'upload' && (
        <UploadCard onNext={() => setStep('compliance')} />
      )}
      {step === 'compliance' && data && (
        <ComplianceTable data={data.requirements} onNext={() => setStep('draft')} />
      )}
      {step === 'draft' && data && (
        <DraftPanel outline={data.draft_outline} paragraphs={data.sample_paragraphs} onNext={() => setStep('predict')} />
      )}
      {step === 'predict' && data && (
        <PredictorCard predictor={data.predictor} />
      )}
    </div>
  );
}
