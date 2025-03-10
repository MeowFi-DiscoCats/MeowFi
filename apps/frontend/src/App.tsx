import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import TimeVaults from './pages/TimeVaults';
import Navbar from './components/NavBar';
import AdminRoutes from './pages/Admin';

import { createAppKit } from '@reown/appkit/react';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { AppKitNetwork, monadTestnet } from '@reown/appkit/networks';
import Faucet from './pages/Faucet';

const projectId: string = import.meta.env.VITE_REOWN_PROJECT_ID;
const networks: [AppKitNetwork] = [monadTestnet];

const metadata = {
  name: 'MeowFi',
  description: 'MeowFi is a platform for NFT Time Vaults',
  url: 'https://meowfi.xyz',
  icons: ['https://meowfi.xyz/images/logo.webp'],
};

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
        <Route path="/admin/*" element={<AdminRoutes />} />
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
