import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import TimeVaults from './pages/TimeVaults';
import Navbar from './components/NavBar';
import AdminRoutes from './pages/Admin';

import { createAppKit } from '@reown/appkit/react';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { AppKitNetwork, monadTestnet } from '@reown/appkit/networks';

const projectId: string = import.meta.env.VITE_REOWN_PROJECT_ID;
const networks: [AppKitNetwork] = [monadTestnet];

const metadata = {
  name: 'MeowFi',
  description: 'MeowFi is a platform for NFT Time Vaults',
  url: 'https://meowfi.xyz',
  icons: ['https://meowfi.xyz/avatars'],
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
  themeMode: 'light',
});

function Layout() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPage && <Navbar />}
      <Routes>
        <Route index element={<TimeVaults />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
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

export default App;
