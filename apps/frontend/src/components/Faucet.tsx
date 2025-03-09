import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { LuPlus } from 'react-icons/lu';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider, Contract, Eip1193Provider, ethers } from 'ethers';
import { tokenAbi, usdcContractAddress } from '@/lib/abi.data';

export default function Faucet() {
  const [sendAddress, setSendAddress] = useState('');
  const [amount, setAmount] = useState('');

  const { isConnected } = useAppKitAccount();
  const { walletProvider }: { walletProvider: Eip1193Provider } =
    useAppKitProvider('eip155');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Adding funds to:', sendAddress, 'Amount:', amount);
    if (isConnected) {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      const tokencontract = new Contract(usdcContractAddress, tokenAbi, signer);
      const decimals: number = await tokencontract.decimals();
      console.log(decimals);

      const tx = await tokencontract.mint(
        sendAddress,
        ethers.parseUnits(amount, decimals)
      );
      const conf = await tx.wait();
      if (conf) {
        alert(`${amount} usdc Sent to ${sendAddress}`);
      } else {
        alert(`Error sending funds.`);
      }
    }
    setSendAddress('');
    setAmount('');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center rounded-md bg-emerald-500 px-4 py-2 text-white transition hover:bg-emerald-600">
          <LuPlus className="mr-2 h-5 w-5" />
          Faucet
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Funds</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <DialogFooter>
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
            >
              Submit
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
