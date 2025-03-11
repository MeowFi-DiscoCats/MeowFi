import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AdminDashboard from './AdminDashboard';
import { LockKeyhole, Mail } from 'lucide-react';
import AuthGuard from '@/lib/AuthGuard';
import CatEar from '../components/svg/CatEar';
import { Link } from 'react-router-dom';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + '/admin/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      window.location.href = '/admin/dashboard';
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'An error occurred during login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      window.location.href = '/admin/dashboard';
    }
  }, []);

  return (
    <section className="mt-4 px-[3vw] py-10 pt-20">
      <div className="bg-cream border-saffron relative mx-auto flex min-h-[500px] max-w-[600px] flex-col items-center justify-center gap-8 rounded-2xl border-4 p-6 max-md:px-4 max-sm:rounded-none">
        <img
          width="100"
          className="absolute -top-7 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 transform"
          src="/images/welcomeCat.webp"
          alt="Welcome Cat"
        />
        <div className="absolute -top-10 left-[10%] -z-10 scale-x-[-1] transform">
          <CatEar />
        </div>
        <div className="absolute -top-10 right-[10%] -z-10">
          <CatEar />
        </div>
        <Link className="font-Showcard text-orange text-4xl" to="/">
          Admin Login
        </Link>
        <form onSubmit={handleSubmit} className="w-full max-w-96 space-y-4">
          {error && (
            <div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
              {error}
            </div>
          )}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <div className="relative">
              <Mail className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
              <input
                id="username"
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 pl-10 shadow-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <LockKeyhole className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
              <input
                id="password"
                type="password"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 pl-10 shadow-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-yellow hover:bg-yellow/90 w-full rounded-xl px-4 py-2 text-center text-black transition"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </section>
  );
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLoginPage />} />
      <Route
        path="dashboard"
        element={
          <AuthGuard>
            <AdminDashboard />
          </AuthGuard>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
