import CatEar from '../components/svg/CatEar';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider, Contract, Eip1193Provider, ethers } from 'ethers';
import { tokenAbi, usdcContractAddress } from '@/lib/abi.data';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Faucet() {
  const [sendAddress, setSendAddress] = useState('');
  const [amount, setAmount] = useState('');

  const { isConnected } = useAppKitAccount();
  const { walletProvider }: { walletProvider: Eip1193Provider } =
    useAppKitProvider('eip155');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isConnected) {
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();

        const tokencontract = new Contract(
          usdcContractAddress,
          tokenAbi,
          signer
        );
        const decimals: number = await tokencontract.decimals();

        const tx = await tokencontract.mint(
          sendAddress,
          ethers.parseUnits(amount, decimals)
        );
        const conf = await tx.wait();
        if (conf) {
          toast(`${amount} usdc Sent to ${sendAddress}`);
        } else {
          toast(`Error sending funds.`);
        }
      }
      setSendAddress('');
      setAmount('');
    } catch (e: unknown) {
      toast('Error sending funds.');
      console.error(e);
    }
  };

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
        <h2 className="font-Showcard text-orange text-4xl">ADD FAUCET</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-96 space-y-4">
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              id="address"
              type="text"
              value={sendAddress}
              onChange={(e) => setSendAddress(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-yellow hover:bg-yellow/90 w-full rounded-xl px-4 py-2 text-center text-black transition"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
