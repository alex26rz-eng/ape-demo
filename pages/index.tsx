import Head from 'next/head';
import { useState } from 'react';
import LeadModal from '../components/LeadModal';

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Head>
        <title>APE Demo</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
        <h1 className="text-3xl font-bold">Win government contracts with AI</h1>
        <p>Join the waitlist to stay updated.</p>
        <button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Join Waitlist
        </button>
        <LeadModal open={open} setOpen={setOpen} />
      </main>
    </>
  );
}
