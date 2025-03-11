import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import TimeVaults from './pages/TimeVaults';
import Navbar from './components/NavBar';
import Faucet from './pages/Faucet';

import { createAppKit } from '@reown/appkit/react';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { AppKitNetwork, monadTestnet } from '@reown/appkit/networks';

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

function Layout() {
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <Navbar />
              <TimeVaults />
            </>
          }
        />
        {/* Use Suspense for lazy-loaded components */}
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<div>Loading Admin...</div>}>
              <AdminRoutes />
            </Suspense>
          }
        />
        <Route path="/faucet" element={<Faucet />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    </>
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
    <div>
      <h1>404</h1>
      <p>Page not found</p>
    </div>
  );
}

export default App;

