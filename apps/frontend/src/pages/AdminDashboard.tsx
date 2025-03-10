import VaultManagement from '@/components/VaultManagement';
import { LuLogOut } from 'react-icons/lu';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';

export default function AdminDashboard() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/admin';
  };
  const { open } = useAppKit();

  const { isConnected } = useAppKitAccount();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl p-8">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={() => open()}
              className="rounded-md bg-blue-600 px-4 py-2 text-white shadow transition duration-200 ease-in-out hover:bg-blue-700"
            >
              {!isConnected ? 'Connect Wallet' : 'Connected'}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center rounded-md bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
            >
              <LuLogOut className="mr-2 h-5 w-5" />
              Logout
            </button>
          </div>
        </header>
        <div className="flex flex-col gap-4 rounded border border-gray-200 bg-white p-6 shadow">
          <VaultManagement />
        </div>
      </div>
    </div>
  );
}
