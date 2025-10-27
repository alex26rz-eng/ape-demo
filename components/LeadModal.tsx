import { useState } from "react";

interface LeadModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function LeadModal({ open, setOpen }: LeadModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    naics: "",
  });

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true); // fake submission
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded shadow-md max-w-sm w-full text-center">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <h2 className="text-xl font-semibold">Join the Waitlist</h2>

            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              name="email"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              name="company"
              placeholder="Company"
              value={form.company}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="role"
              placeholder="Role / Title"
              value={form.role}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="naics"
              placeholder="NAICS Code (optional)"
              value={form.naics}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Join Waitlist
            </button>
          </form>
        ) : (
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">You’re In!</h2>
            <p>
              Thanks {form.name || "there"}, you’ve been added to the waitlist.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="bg-gray-700 text-white px-4 py-2 rounded w-full"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
