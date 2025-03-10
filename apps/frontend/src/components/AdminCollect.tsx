import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider, Contract, Eip1193Provider } from 'ethers';
import { timeVaultV1Abi } from '@/lib/abi.data';

export default function AdminCollect() {
  const [proxyAddress, setProxyAddress] = useState('');
  const [receiverAddress, setReceiverAddress] = useState('');
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  const { isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155') as {
    walletProvider: Eip1193Provider;
  };

  const isValidAddress = (address: string) =>
    /^0x[a-fA-F0-9]{40}$/.test(address);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setNotification('');

    if (!isValidAddress(proxyAddress) || !isValidAddress(receiverAddress)) {
      setError(
        'Invalid address format. Please enter a valid Ethereum address.'
      );
      return;
    }

    setNotification(
      'Funds collection initiated. Transaction is being processed.'
    );

    if (!isConnected) {
      setError('Wallet is not connected.');
      return;
    }

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const proxyContract = new Contract(proxyAddress, timeVaultV1Abi, signer);
      const tx = await proxyContract.withdrawAllFunds(receiverAddress);
      await tx.wait();
      setNotification(`Funds withdrawn to ${receiverAddress}`);
    } catch (e: unknown) {
      setError('Transaction failed. Please check your input and try again.');
      console.error(e);
    }
  };

  return (
    <div className="flex">
      {notification && (
        <div className="mb-4 rounded-lg bg-green-500 p-2 text-white">
          {notification}
        </div>
      )}
      {error && (
        <div className="mb-4 rounded-lg bg-red-500 p-2 text-white">{error}</div>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-4 rounded-md px-8 py-5">Collect Funds</Button>
        </DialogTrigger>
        <DialogContent>
          <h2 className="font-Showcard pt-8 text-center text-2xl">
            Collect Funds
          </h2>
          <form
            className="flex flex-col gap-4 p-4 py-12"
            onSubmit={handleSubmit}
          >
            <Input
              placeholder="Proxy Address"
              value={proxyAddress}
              onChange={(e) => setProxyAddress(e.target.value)}
            />
            <Input
              placeholder="Receiver Address"
              value={receiverAddress}
              onChange={(e) => setReceiverAddress(e.target.value)}
            />
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
