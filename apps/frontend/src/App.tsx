import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  Link,
} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import TimeVaults from './pages/TimeVaults';
import Navbar from './components/NavBar';
import Faucet from './pages/Faucet';

import { createAppKit } from '@reown/appkit/react';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { AppKitNetwork, monadTestnet } from '@reown/appkit/networks';
import Footer from './components/Footer';

const projectId: string = import.meta.env.VITE_REOWN_PROJECT_ID;
const networks: [AppKitNetwork] = [monadTestnet];

const metadata = {
  name: 'MeowFi',
  description: 'MeowFi is a platform for NFT Time Vaults',
  url: 'https://app.meowfi.xyz',
  icons: ['https://app.meowfi.xyz/images/logo.webp'],
};

const AdminRoutes = lazy(() => import('./pages/Admin'));

createAppKit({
  themeVariables: {
    '--w3m-accent': '#e09667',
    '--w3m-font-family': 'Source Sans 3',
    '--w3m-border-radius-master': '2px',
    '--w3m-color-mix': ' #ff7b27',
    '--w3m-color-mix-strength': 1,
    '--w3m-qr-color': '#ff7b27',
  },
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true,
  },
});

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function Layout() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<TimeVaults />} />
        <Route path="faucet" element={<Faucet />} />
      </Route>
      <Route
        path="/admin/*"
        element={
          <Suspense fallback={<div>Loading Admin...</div>}>
            <AdminRoutes />
          </Suspense>
        }
      />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<Navigate to="/error" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-white">
      <h1 className="text-9xl font-extrabold">404</h1>
      <p className="mt-4 text-3xl font-semibold">Page Not Found</p>
      <p className="mt-2 text-center text-lg text-gray-400">
        The page you are looking for doesnt exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block rounded border border-white px-6 py-3 transition duration-200 hover:bg-white hover:text-gray-900"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default App;
