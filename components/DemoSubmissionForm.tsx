import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function DemoSubmissionForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      if (!file) {
        setErrorMessage('Please select a file to upload.');
        setStatus('error');
        return;
      }

      // Generate a unique file name to avoid collisions
      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('rfp_uploads')
        .upload(fileName, file);

      if (uploadError) {
        setErrorMessage(uploadError.message);
        setStatus('error');
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('rfp_uploads')
        .getPublicUrl(fileName);
      const fileUrl = publicUrlData?.publicUrl ?? '';

      const { error: insertError } = await supabase.from('demo_submissions').insert({
        name,
        email,
        company,
        file_url: fileUrl,
      });

      if (insertError) {
        setErrorMessage(insertError.message);
        setStatus('error');
        return;
      }

      setStatus('success');
      setName('');
      setEmail('');
      setCompany('');
      setFile(null);
    } catch (err: any) {
      setErrorMessage(err.message);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        accept=".pdf,.doc,.docx"
        required
      />
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Submitting...' : 'Submit'}
      </button>
      {status === 'error' && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {status === 'success' && <p>Submission received! Thank you.</p>}
    </form>
  );
}
