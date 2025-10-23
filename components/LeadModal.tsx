import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

interface LeadModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create Supabase client outside of component to avoid recreating on each render
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LeadModal({ open, setOpen }: LeadModalProps) {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [naics, setNaics] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    try {
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            email,
            company,
            role,
            naics
          }
        ]);
      if (error) {
        console.error(error);
        setErrorMessage('Could not add to waitlist.');
        setStatus('error');
      } else {
        setStatus('success');
        // clear form
        setEmail('');
        setCompany('');
        setRole('');
        setNaics('');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Unexpected error.');
      setStatus('error');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg space-y-4 w-full max-w-md">
        <h2 className="text-xl font-semibold">Join the Waitlist</h2>
        {status === 'success' ? (
          <div className="text-green-600">
            Thanks for joining! We'll be in touch.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="text"
              placeholder="NAICS Code"
              value={naics}
              onChange={(e) => setNaics(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
            {status === 'error' && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-accent text-white px-4 py-2 rounded hover:bg-indigo-700 transition w-full"
            >
              {status === 'loading' ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        )}
        <button
          onClick={() => {
            setOpen(false);
            setStatus('idle');
          }}
          className="text-sm underline text-gray-500"
        >
          Close
        </button>
      </div>
    </div>
  );
}
