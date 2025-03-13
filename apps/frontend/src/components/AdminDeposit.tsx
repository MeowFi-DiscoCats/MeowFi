import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider, Contract, Eip1193Provider } from 'ethers';
import { nativeTimeVaultAbi, timeVaultV1Abi, tokenAbi } from '@/lib/abi.data';

export default function AdminDeposit() {
  const [amount, setAmount] = useState('');
  const [proxyAddress, setProxyAddress] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  const { isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155') as {
    walletProvider: Eip1193Provider;
  };

  const isValidAddress = (address: string) =>
    /^0x[a-fA-F0-9]{40}$/.test(address);
  const isValidAmount = (amt: string) =>
    /^\d+(\.\d+)?$/.test(amt) && parseFloat(amt) > 0;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setNotification('');

    if (!isValidAddress(proxyAddress) || !isValidAddress(tokenAddress)) {
      setError(
        'Invalid address format. Please enter a valid Ethereum address.'
      );
      return;
    }

    if (!isValidAmount(amount)) {
      setError('Invalid amount. Please enter a positive number.');
      return;
    }

    setNotification('Deposit initiated. Transaction is being processed.');

    if (!isConnected) {
      setError('Wallet is not connected.');
      return;
    }

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const proxyContract = new Contract(proxyAddress, nativeTimeVaultAbi, signer);
      // const proxyContract = new Contract(proxyAddress, timeVaultV1Abi, signer);
      // const tokencontract = new Contract(tokenAddress, tokenAbi, signer);

      // const decimals: bigint = await tokencontract.decimals();

      
        const tx2 = await proxyContract.depositExternalFunds({value:(Number(amount) * 10 ** 18).toString()});
        const conf2 = await tx2.wait();
        if (conf2) {
          setNotification(
            `Successfully deposited ${amount} tokens to ${proxyAddress}`
          );
        }
      
      // const tx = await tokencontract.approve(
      //   proxyContract,
      //   (Number(amount) * 10 ** Number(decimals)).toString()
      // );
      // const conf = await tx.wait();
      // if (conf) {
      //   const tx2 = await proxyContract.depositExternalFunds((Number(amount) * 10 ** Number(decimals)).toString());
      //   const conf2 = await tx2.wait();
      //   if (conf2) {
      //     setNotification(
      //       `Successfully deposited ${amount} tokens to ${proxyAddress}`
      //     );
      //   }
      // }
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
          <Button className="mt-4 rounded-md px-8 py-5">Deposit Funds</Button>
        </DialogTrigger>
        <DialogContent>
          <h2 className="font-Showcard pt-8 text-center text-2xl">
            Deposit Funds
          </h2>
          <form
            className="flex flex-col gap-4 p-4 py-12"
            onSubmit={handleSubmit}
          >
            <Input
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Input
              placeholder="Proxy Address"
              value={proxyAddress}
              onChange={(e) => setProxyAddress(e.target.value)}
            />
            <Input
              placeholder="Token Address"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
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
