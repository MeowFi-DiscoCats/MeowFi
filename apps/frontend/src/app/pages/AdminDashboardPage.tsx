import VaultManagement from '@/features/admin/components/VaultManagement';
import { LuLogOut } from 'react-icons/lu';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import CatEar from '@/components/svg/CatEar';
import Avatar from '@/components/svg/Avatar';
import { Link } from 'react-router-dom';
import AdminCollect from '@/features/admin/components/AdminCollect';
import AdminDeposit from '@/features/admin/components/AdminDeposit';

export default function AdminDashboardPage() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/admin';
  };
  const { open } = useAppKit();

  const { isConnected } = useAppKitAccount();
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl">
        <header className="m-4 mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link className="font-Showcard text-4xl text-white" to="/">
            Dashboard
          </Link>
          <div className="flex gap-4">
            <span className="flex items-center" onClick={() => open()}>
              {!isConnected ? (
                <a className="font-Bubblegum hover:bg-yellow/95 shadow-inner-custom bg-yellow text-gunmetal flex h-[42px] items-center rounded-xl px-2 text-center leading-6 tracking-wider text-nowrap max-[550px]:order-1">
                  Connect Wallet
                </a>
              ) : (
                <a className="to-amber from-orange inline-block aspect-square w-10 rounded-full bg-gradient-to-b">
                  <Avatar />
                </a>
              )}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center rounded-xl bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
            >
              <LuLogOut className="mr-2 h-5 w-5" />
              Logout
            </button>
          </div>
        </header>
        <section className="mt-4 px-[3vw] py-10 pt-20">
          <div className="bg-cream border-saffron relative mx-auto min-h-[400px] max-w-[1100px] gap-8 rounded-2xl border-4 p-6 max-md:px-4 max-sm:rounded-none">
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
            <div className="flex flex-wrap items-center gap-4">
              <VaultManagement />
              <AdminCollect />
              <AdminDeposit />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
