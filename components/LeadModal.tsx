import { useState } from 'react';

interface LeadModalProps {
  onClose: () => void;
}

export default function LeadModal({ onClose }: LeadModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You could fake an API call here with a timeout if you want to simulate processing.
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold">Join the Waitlist</h2>

            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Join Waitlist
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">You’re in!</h2>
            <p>
              Thanks {form.name || 'friend'}, we’ve added you to the waitlist. We’ll be in touch.
            </p>
            <button
              onClick={onClose}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
