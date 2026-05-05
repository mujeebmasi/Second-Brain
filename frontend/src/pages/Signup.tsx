import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        <a href="/dashboard" className="text-sm text-[#7164c0] hover:underline">Back to dashboard</a>
        <h1 className="text-2xl font-bold text-slate-800 mt-2">Create account</h1>
        <p className="text-sm text-slate-500 mt-1">Sign up to start saving content in your second brain.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</div>}

          <div>
            <label htmlFor="signup-username" className="block text-sm font-medium text-slate-700 mb-1">Username</label>
            <input
              id="signup-username"
              type="text"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter your username"
              className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7164c0]"
            />
          </div>

          <div>
            <label htmlFor="signup-email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              id="signup-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7164c0]"
            />
          </div>

          <div>
            <label htmlFor="signup-password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              id="signup-password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
              className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7164c0]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7164c0] text-white py-2 rounded-md hover:bg-[#5a4fb0] transition-colors disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>

          <p className="text-sm text-slate-500 text-center">
            Already have an account? <a href="/signin" className="text-[#7164c0] hover:underline">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
}
