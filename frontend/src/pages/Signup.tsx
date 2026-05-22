import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthShell } from '../components/AuthShell';
import { signup } from '../lib/api';

export function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    signup({ username, email, password })
      .then(() => navigate('/signin'))
      .catch((apiError: Error) => setError(apiError.message))
      .finally(() => setLoading(false));
  };

  return (
    <AuthShell
      eyebrow="Start here"
      title="Create a home for your ideas."
      subtitle="Set up a clean place to save links, posts, and notes before they disappear into a dozen tabs."
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">Create account</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">Build your second brain in a few minutes.</p>
        </div>
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

        <div>
          <label htmlFor="signup-username" className="mb-2 block text-sm font-medium text-slate-700">Username</label>
          <input
            id="signup-username"
            type="text"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter your username"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#7164c0] focus:bg-white focus:ring-4 focus:ring-[#7164c0]/10"
          />
        </div>

        <div>
          <label htmlFor="signup-email" className="mb-2 block text-sm font-medium text-slate-700">Email</label>
          <input
            id="signup-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#7164c0] focus:bg-white focus:ring-4 focus:ring-[#7164c0]/10"
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="mb-2 block text-sm font-medium text-slate-700">Password</label>
          <input
            id="signup-password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create a password"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#7164c0] focus:bg-white focus:ring-4 focus:ring-[#7164c0]/10"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-[#7164c0] px-4 py-3 font-medium text-white shadow-lg shadow-[#7164c0]/20 transition hover:bg-[#5f52b7] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Creating account...' : 'Sign up'}
        </button>

        <p className="text-center text-sm text-slate-500">
          Already have an account? <a href="/signin" className="font-medium text-[#7164c0] hover:underline">Sign in</a>
        </p>
      </form>
    </AuthShell>
  );
}
