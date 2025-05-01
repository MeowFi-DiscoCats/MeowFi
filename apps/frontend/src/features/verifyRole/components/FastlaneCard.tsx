import Link from '@/components/svg/Link';
import { vaults } from '@/data/vaults';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { Eip1193Provider } from 'ethers';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { FaDiscord } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa6';
import { toast } from 'sonner';

const apiUrl = import.meta.env.VITE_API_URL;

export default function FastlaneCard({ index }: { index: number }) {
  const vault = vaults[index];
  const [twitterVerified, setTwitterVerified] = useState(false);
  const [discordVerified, setDiscordVerified] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const verifyTwitter = async () => {
    window.open('https://x.com/0xFastLane', '_blank');
    setTimeout(() => setTwitterVerified(true), 5000);
  };
  const verifyDiscord = async () => {
    window.open('https://discord.fastlane.xyz/', '_blank');
    setTimeout(() => setDiscordVerified(true), 5000);
  };
  const { isConnected, address } = useAppKitAccount();

  const { walletProvider }: { walletProvider: Eip1193Provider } =
    useAppKitProvider('eip155');

  function checkToken() {
    const token = localStorage.getItem('verifytoken');
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      const isExpired = decoded.exp! * 1000 < Date.now();
      if (isExpired) {
        localStorage.removeItem('verifytoken');
        toast('Token expired, please re-login');
        setAuthenticated(false);
        return;
      }
      setTwitterVerified(true);
      setDiscordVerified(true);
      setAuthenticated(true);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    params.delete('token');
    window.history.replaceState({}, '', window.location.pathname);
    if (token) {
      localStorage.setItem('verifytoken', token);
      toast('Login Successful');
    }
    checkToken();
  }, []);

  const handleClaim = async () => {
    checkToken();
    if (!authenticated) {
      window.open(apiUrl + '/auth/discord', '_self');
      return;
    }
    if (!isConnected) {
      toast('Please connect your wallet first');
      return;
    }

    const signature = await walletProvider.request({
      method: 'personal_sign',
      params: [vault.nftName, address],
    });

    fetch(apiUrl + '/auth/verify', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('verifytoken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        signature,
        address,
        nftAddress: vault.nftAddress,
        nftName: vault.nftName,
        guildId: '1329933800125235260',
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data: { message: string }) => {
        toast(data.message);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-20 border-x-2 border-t-2 border-white px-1.5 pt-0.25 shadow-[0_-4px_4px] shadow-blue-700">
        <img
          className="h-full border border-blue-700"
          src="/images/fastlaneLogo.webp"
        />
      </div>
      <div className="bg-cream w-full overflow-hidden rounded-xl md:min-w-[300px]">
        <div className="bg-yellow border-gunmetal border-b p-2 text-center text-xl font-semibold">
          Fastlane: Discord Role
        </div>
        <div className="flex flex-col items-center justify-center gap-2 p-4">
          <div className="border-gunmetal rounded-xl border bg-white px-2 py-1 text-center text-lg font-semibold">
            {vault.title} Vault
          </div>
          <p className="font-Bubblegum">Hold Liquid {vault.nftName} NFT</p>
          <div className="flex flex-col gap-3">
            <div className="bg-gunmetal flex items-center justify-between gap-4 border-2 border-black p-2">
              <div className="flex items-center gap-2">
                <span
                  className={`text-gunmetal border p-1 text-xl ${twitterVerified ? 'bg-emerald-500' : 'bg-cream'}`}
                >
                  <FaTwitter />
                </span>
                <span className="font-Bubblegum text-sm text-white">
                  <span className="font-Bubblegum text-yellow mr-1">
                    Task 1:
                  </span>
                  Follow the Fastlane on Twitter
                </span>
              </div>
              <a
                onClick={verifyTwitter}
                className="bg-cream rounded-full border-2 border-black p-1 text-sm text-black"
              >
                <Link />
              </a>
            </div>
            <div className="bg-gunmetal flex items-center justify-between gap-4 border-2 border-black p-2">
              <div className="flex items-center gap-2">
                <span
                  className={`text-gunmetal border p-1 text-xl ${discordVerified ? 'bg-emerald-500' : 'bg-cream'}`}
                >
                  <FaDiscord />
                </span>
                <span className="font-Bubblegum text-sm text-white">
                  <span className="font-Bubblegum text-yellow mr-1">
                    Task 2:
                  </span>
                  Join MeowFi Discord
                </span>
              </div>
              <a
                onClick={verifyDiscord}
                className="bg-cream rounded-full border-2 border-black p-1 text-sm text-black"
              >
                <Link />
              </a>
            </div>
          </div>
          <button
            onClick={handleClaim}
            className="shadow-yellow bg-cream font-Bubblegum mt-2 border-2 border-black p-2 px-[20%] text-black shadow-[0_4px_4px] hover:bg-gray-200"
          >
            Claim Role
          </button>
        </div>
      </div>
    </div>
  );
}
