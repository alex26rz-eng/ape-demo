import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const resend = new Resend(process.env.RESEND_API_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, company } = req.body;

  try {
    // insert into demo_requests table
    await supabase.from('demo_requests').insert({ name, email, company });

    // send email notification to internal team
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'demo@ape.com',
      to: [process.env.CONTACT_EMAIL || 'alex26rz@gmail.com'],
      subject: `New RFP submission from ${name}`,
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Company: ${company}</p>`
    });

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
