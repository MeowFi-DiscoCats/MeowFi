import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
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
      {/* Routes with Navbar */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<TimeVaults />} />
        <Route path="faucet" element={<Faucet />} />
      </Route>
      {/* Admin routes with lazy loading */}
      <Route
        path="/admin/*"
        element={
          <Suspense fallback={<div>Loading Admin...</div>}>
            <AdminRoutes />
          </Suspense>
        }
      />
      {/* Error page */}
      <Route path="/error" element={<ErrorPage />} />
      {/* Catch-all route */}
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
    <div>
      <h1>404</h1>
      <p>Page not found</p>
    </div>
  );
}

export default App;
