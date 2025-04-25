import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { vaults } from '@/data/vaults';
import { tokens } from '@/data/tokens';
import { toast } from 'sonner';
import {
  useAppKitAccount,
  useAppKitNetworkCore,
  useAppKitProvider,
} from '@reown/appkit/react';
import { BrowserProvider, Contract, Eip1193Provider } from 'ethers';

export default function DepositBribeDialog({
  amount,
  selectedVaultIndex,
  selectedTokenIndex,
  userBalance,
  setRefresh,
}: {
  amount: number;
  selectedVaultIndex: number;
  selectedTokenIndex: number;
  userBalance: number;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [status, setStatus] = useState('Deposit');
  const [open, setOpen] = useState(false);
  const vault = vaults[selectedVaultIndex];
  const token = tokens[selectedTokenIndex];

  const { isConnected } = useAppKitAccount();
  const { walletProvider }: { walletProvider: Eip1193Provider } =
    useAppKitProvider('eip155');
  const { chainId } = useAppKitNetworkCore();

  const handleDeposit = async () => {
    if (!isConnected) {
      toast('Please connect your wallet.');
      return;
    }

    const provider = new BrowserProvider(walletProvider, chainId);
    const signer = await provider.getSigner();

    setStatus('Depositing...');

    try {
      const amountInWei = (
        Number(amount) *
        10 ** Number(token.decimals)
      ).toString();

      const tokenContract = new Contract(
        token.address,
        ['function approve(address spender, uint256 amount) returns (bool)'],
        signer
      );

      const approval = await tokenContract.approve(
        vault.proxyAddress,
        amountInWei
      );
      await approval.wait();

      const proxyContract = new Contract(
        vault.proxyAddress,
        ['function bribe(uint256 _amnt, address _tknAddress)'],
        signer
      );
      const depositTx = await proxyContract.bribe(amountInWei, token.address);
      await depositTx.wait();

      toast.success('Bribe successful');
      setRefresh((prev) => !prev);
      setStatus('Deposit');
      setOpen(false);
    } catch (error) {
      console.error('Error during bribe:', error);
      toast('Bribe failed', {
        description: 'Please try again',
      });
      setStatus('Deposit');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-yellow hover:bg-amber border-gunmetal font-Teko mx-auto my-1 rounded-lg border px-12 py-1 text-lg font-semibold text-black">
        Deposit Bribes
      </DialogTrigger>
      <DialogContent className="bg-cream border-gunmetal !max-w-[400px] rounded-3xl border-3">
        <DialogHeader>
          <DialogTitle className="font-Teko text-center text-2xl font-semibold tracking-wide">
            Deposit Confirmation
          </DialogTitle>
          <DialogDescription className="hidden text-center text-sm font-semibold">
            You are depositing bribes. Please ensure your wallet is connected
            and has enough balance.
          </DialogDescription>
          <section className="flex flex-col justify-center">
            <div className="mt-4 flex items-center justify-between">
              <p className="font-Teko font-semibold tracking-wide">
                You are Bribing
              </p>
            </div>
            <div className="border-gunmetal flex items-center justify-between rounded-xl border bg-white px-2 py-1">
              <div className="bg-yellow border-gunmetal font-Teko flex-1 rounded-xl border p-0.5 px-4 text-center text-lg font-semibold">
                {amount}
              </div>
              <div className="flex flex-1 items-center justify-end gap-2 px-4">
                <span className="font-Teko font-semibold tracking-wide">
                  {token.symbol}
                </span>
                <img
                  width={20}
                  className="aspect-square rounded-xl"
                  src={token.img}
                  alt={token.symbol}
                />
              </div>
            </div>
            <div className="text-end text-sm">
              <strong>Balance:</strong>
              <span className="mx-1 text-xs"> {userBalance}</span>
              <span className="text-xs">{token.symbol}</span>
            </div>
            <p className="font-Teko font-semibold">For</p>
            <div className="border-gunmetal font-Teko max-md:text-md flex items-center justify-center rounded-xl border bg-white px-2 py-1 text-center text-lg font-semibold">
              {vault.title} Liquid Vault
            </div>
            <Button
              onClick={handleDeposit}
              variant="outline"
              className="bg-yellow hover:bg-amber border-gunmetal font-Teko mx-auto mt-6 rounded-lg px-[30%] text-lg font-semibold text-black"
            >
              {status}
            </Button>
          </section>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
