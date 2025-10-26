import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, company, fileUrl } = req.body;

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@yourcareercoach.ai',
      to: 'alex26rz@gmail.com',
      subject: 'New RFP Submission Received',
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Company: ${company}</p><p>File: <a href="${fileUrl}">${fileUrl}</a></p>`,
    });

    return res.status(200).json({ status: 'sent' });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message || 'Error sending email' });
  }
}
