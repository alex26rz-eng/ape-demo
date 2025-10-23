import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import LeadModal from '../components/LeadModal';

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Head>
        <title>APE – AI Procurement Engine</title>
        <meta
          name="description"
          content="Automate the supplier-side government contracting process with AI."
        />
        {/* Only load analytics in production */}
        {process.env.NODE_ENV === 'production' && (
          <script
            defer
            data-domain="ape-demo.com"
            src="https://plausible.io/js/script.js"
          ></script>
        )}
      </Head>
      <header className="w-full">
        <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
          <Link href="/" className="text-2xl font-bold">
            APE
          </Link>
          <Link href="/demo" className="text-accent hover:underline">
            Demo
          </Link>
        </nav>
      </header>
      <main className="min-h-screen flex flex-col items-center px-4 py-8 space-y-24">
        {/* Hero */}
        <section className="text-center max-w-4xl space-y-6">
          <h1 className="text-5xl font-extrabold">
            Win government contracts with AI.
          </h1>
          <p className="text-xl text-gray-600">
            APE turns 100+ page RFPs into a compliance matrix, a drafted response, and an award-style prediction.
          </p>
          <div className="flex justify-center space-x-4 mt-6">
            <Link
              href="/demo"
              className="bg-accent text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
            >
              Try the Demo
            </Link>
            <button
              className="bg-white border border-accent text-accent px-6 py-3 rounded-md hover:bg-gray-100 transition"
              onClick={() => setOpen(true)}
            >
              Join Waitlist
            </button>
          </div>
        </section>

        {/* What It Does */}
        <section className="w-full max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-8">
            What It Does
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border rounded-lg p-6 shadow flex flex-col items-start space-y-3">
              <span className="text-4xl">📋</span>
              <h3 className="text-xl font-semibold">Compliance Matrix</h3>
              <p className="text-gray-600">
                Generate a requirement-by-requirement matrix to ensure every spec is covered.
              </p>
            </div>
            <div className="bg-white border rounded-lg p-6 shadow flex flex-col items-start space-y-3">
              <span className="text-4xl">🧠</span>
              <h3 className="text-xl font-semibold">Draft Wizard</h3>
              <p className="text-gray-600">
                Auto-generate outlines and sample paragraphs tailored to the RFP.
              </p>
            </div>
            <div className="bg-white border rounded-lg p-6 shadow flex flex-col items-start space-y-3">
              <span className="text-4xl">🎯</span>
              <h3 className="text-xl font-semibold">Award Predictor</h3>
              <p className="text-gray-600">
                Predict your odds using Best Value vs LPTA analysis.
              </p>
            </div>
          </div>
        </section>

        {/* Founder Note */}
        <section className="max-w-4xl text-center space-y-4">
          <h2 className="text-2xl font-bold">Founder Note</h2>
          <p className="text-gray-600">
            I built APE because I’ve spent too many late nights manually parsing government RFPs. Our vision is to give small and mid-sized contractors a fighting chance against incumbents by automating the red tape.
          </p>
          <a
            href="https://calendly.com/your-calendly-link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
          >
            Book a call
          </a>
        </section>
      </main>
      <LeadModal open={open} setOpen={setOpen} />
    </>
  );
}
