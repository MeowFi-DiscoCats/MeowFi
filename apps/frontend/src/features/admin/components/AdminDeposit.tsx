import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider, Contract, Eip1193Provider } from 'ethers';
import abi from '@/data/abi';

import { toast } from 'sonner';

export default function AdminDeposit() {
  const [amount, setAmount] = useState('');
  const [proxyAddress, setProxyAddress] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');

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

    if (!isValidAddress(proxyAddress) || !isValidAddress(tokenAddress)) {
      toast('Invalid address format. Please enter a valid Ethereum address.');
      return;
    }

    if (!isValidAmount(amount)) {
      toast('Invalid amount. Please enter a positive number.');
      return;
    }

    toast('Deposit initiated. Transaction is being processed.');

    if (!isConnected) {
      toast('Wallet is not connected.');
      return;
    }

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const proxyContract = new Contract(
        proxyAddress,
        abi.nativeTimeVault,
        signer
      );
      // const proxyContract = new Contract(proxyAddress, timeVaultV1Abi, signer);
      // const tokencontract = new Contract(tokenAddress, tokenAbi, signer);

      // const decimals: bigint = await tokencontract.decimals();

      const tx2 = await proxyContract.depositExternalFunds({
        value: (Number(amount) * 10 ** 18).toString(),
      });
      const conf2 = await tx2.wait();
      if (conf2) {
        toast(`Successfully deposited ${amount} tokens to ${proxyAddress}`);
        setAmount('');
        setProxyAddress('');
        setTokenAddress('');
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
      toast('Transaction failed. Please check your input and try again.');
      console.error(e);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">Deposit Funds</Button>
      </DialogTrigger>
      <DialogContent>
        <h2 className="font-Showcard pt-8 text-center text-2xl">
          Deposit Funds
        </h2>
        <form className="flex flex-col gap-4 p-4 py-12" onSubmit={handleSubmit}>
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
  );
}
