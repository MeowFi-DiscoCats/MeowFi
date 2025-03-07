import { BrowserRouter, Routes, Route } from "react-router-dom";

import TimeVaults from "./pages/TimeVaults";
import Navbar from "./components/NavBar";

import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { monadTestnet } from "@reown/appkit/networks";
import { reOwnProjectId } from "./lib/web3Config";
import AdminPage from "./pages/adminPage";
import AdminCollect from "./pages/adminCollect";
import AdminDeposit from "./pages/adminDeposit";
import Faucet from "./pages/faucet";



const projectId = reOwnProjectId


const networks:any = [monadTestnet]


const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', 
  icons: ['https://avatars.mywebsite.com/']
}

// 4. Create a AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

function App() {
  

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<TimeVaults />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin-collect" element={<AdminCollect />} />
        <Route path="/admin-deposit" element={<AdminDeposit />} />
        <Route path="/faucet" element={<Faucet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
