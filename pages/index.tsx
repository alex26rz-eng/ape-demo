import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import LeadModal from '../components/LeadModal';
import { createClient } from '@supabase/supabase-js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shadcn/ui/tabs';
import { FadeIn } from '../components/FadeIn';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
  const [open, setOpen] = useState(false);
  const [calendlyUrl, setCalendlyUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCalendly() {
      try {
        const { data, error } = await supabase
          .from('app_config')
          .select('value')
          .eq('key', 'calendly_url')
          .single();
        if (!error && data) {
          setCalendlyUrl(data.value);
        }
      } catch (err) {
        console.error(err);
      }
    }
    if (supabaseUrl && supabaseKey) {
      fetchCalendly();
    }
  }, []);

  const callUrl =
    calendlyUrl ||
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    'https://calendly.com/your-calendly-link';

  const handleDemoStart = () => {
    if (typeof (window as any).plausible === 'function') {
      (window as any).plausible('Demo Started');
    }
  };

  const handleBookCallClick = () => {
    if (typeof (window as any).plausible === 'function') {
      (window as any).plausible('Book Call Clicked');
    }
  };

  return (
    <>
      <Head>
        <title>APE – AI Procurement Engine</title>
        <meta
          name="description"
          content="Automate the supplier-side government contracting process with AI."
        />
        {process.env.NODE_ENV === 'production' && (
          <script
            defer
            data-domain={process.env.PLAUSIBLE_DOMAIN || 'ape-demo.com'}
            src="https://plausible.io/js/script.js"
          />
        )}
      </Head>
      <main className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
        {/* Nav */}
        <nav className="flex justify-between items-center px-6 py-4">
          <Link href="/">
            <span className="font-bold text-xl">APE</span>
          </Link>
          <Link href="/demo">
            <span className="text-sm underline">Demo</span>
          </Link>
        </nav>
        {/* Hero */}
        <section className="flex flex-col items-center text-center px-4 py-16 space-y-6">
          <FadeIn delay={0}>
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent">
              Win government contracts with AI.
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="max-w-2xl text-lg">
              APE turns 100+ page RFPs into a compliance matrix, a drafted
              response, and an award-style prediction.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo" onClick={handleDemoStart}>
                <span className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-md shadow transition dark:bg-indigo-500 dark:hover:bg-indigo-600">
                  Try the Demo
                </span>
              </Link>
              <button
                onClick={() => setOpen(true)}
                className="px-6 py-3 bg-white/20 hover:bg-white/30 active:scale-95 text-indigo-600 dark:text-indigo-300 backdrop-blur border border-indigo-200 dark:border-indigo-500 rounded-md shadow transition"
              >
                Join Waitlist
              </button>
            </div>
          </FadeIn>
        </section>
        {/* What It Does cards */}
        <section className="px-4 py-12">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl backdrop-blur bg-white/40 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 shadow hover:shadow-lg transition transform hover:scale-[1.02]">
                <h3 className="text-xl font-semibold mb-2">Compliance Matrix</h3>
                <p>
                  Parse RFPs into structured requirement matrices and never miss
                  a section.
                </p>
              </div>
              <div className="p-6 rounded-xl backdrop-blur bg-white/40 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 shadow hover:shadow-lg transition transform hover:scale-[1.02]">
                <h3 className="text-xl font-semibold mb-2">Draft Wizard</h3>
                <p>
                  Generate outlines and sample paragraphs tailored to your NAICS
                  and certifications.
                </p>
              </div>
              <div className="p-6 rounded-xl backdrop-blur bg-white/40 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 shadow hover:shadow-lg transition transform hover:scale-[1.02]">
                <h3 className="text-xl font-semibold mb-2">Award Predictor</h3>
                <p>
                  Evaluate Best-Value vs LPTA and forecast your competitive
                  edge.
                </p>
              </div>
            </div>
          </FadeIn>
        </section>
        {/* Tabs Section */}
        <section className="px-4 py-12">
          <FadeIn>
            <Tabs defaultValue="whyus">
              <TabsList className="flex space-x-2 border-b border-gray-200 dark:border-gray-700 mb-4">
                <TabsTrigger
                  value="whyus"
                  className="px-3 py-2 rounded-t-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:border-b-2 data-[state=active]:border-indigo-500"
                >
                  Why Us
                </TabsTrigger>
                <TabsTrigger
                  value="vision"
                  className="px-3 py-2 rounded-t-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:border-b-2 data-[state=active]:border-indigo-500"
                >
                  Vision
                </TabsTrigger>
                <TabsTrigger
                  value="founder"
                  className="px-3 py-2 rounded-t-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:border-b-2 data-[state=active]:border-indigo-500"
                >
                  Founder Note
                </TabsTrigger>
              </TabsList>
              <TabsContent value="whyus" className="space-y-4">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Supplier-side first: built for SMBs, not agencies.</li>
                  <li>
                    Compliance-native: maps Section L/M to ensure full coverage.
                  </li>
                  <li>
                    Adaptive drafts: tailored to your NAICS and certifications.
                  </li>
                </ul>
              </TabsContent>
              <TabsContent value="vision" className="space-y-4">
                <p>
                  We're building autopilot for bids: predictive award fit,
                  always-compliant updates, and AI that knows federal
                  contracting intimately.
                </p>
              </TabsContent>
              <TabsContent value="founder" className="space-y-4">
                <p>
                  We’re building the tool we wish existed when small teams chase
                  federal work—fast to start, strict on compliance, and honest
                  about what needs a human hand.
                </p>
              </TabsContent>
            </Tabs>
          </FadeIn>
        </section>
        {/* Founder call section */}
        <section className="text-center px-4 py-12">
          <FadeIn>
            <h3 className="text-2xl font-semibold mb-2">
              Ready to see APE in action?
            </h3>
            <p className="mb-4">
              Book a call with our founder to discuss how APE can streamline
              your bidding process.
            </p>
            <button
              onClick={handleBookCallClick}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-md shadow transition"
            >
              <a href={callUrl} target="_blank" rel="noopener noreferrer">
                Book a Call
              </a>
            </button>
          </FadeIn>
        </section>
        <LeadModal open={open} setOpen={setOpen} />
      </main>
    </>
  );
}
