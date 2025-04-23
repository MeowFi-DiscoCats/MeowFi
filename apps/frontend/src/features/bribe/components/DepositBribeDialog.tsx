import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  Dialog,
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

      toast.success('Deposit successful');
      setRefresh((prev: boolean) => !prev);
      setStatus('Deposit');
      setOpen(false);
    } catch (error) {
      console.error('Error during deposit:', error);
      toast('Deposit failed', {
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
      <DialogContent className="bg-cream border-gunmetal !max-w-[400px] rounded-3xl border-2">
        <DialogHeader>
          <DialogTitle className="font-Teko my-4 text-center text-2xl font-semibold tracking-wide">
            Deposit Confirmation
          </DialogTitle>
          <DialogDescription className="bg-cream hidden">
            Dialog for comformation of deposit bribes. Please ensure that the
            wallet
          </DialogDescription>
          <section className="flex flex-col">
            <div className="border-gunmetal flex-start flex w-full flex-col border bg-white p-1 px-4">
              <p className="font-Teko text-start text-sm leading-relaxed font-semibold text-black/70">
                You are Bribing
              </p>
              <p className="font-Teko text-start text-lg leading-relaxed font-semibold text-black">
                {amount} {tokens[selectedTokenIndex].symbol}
              </p>
            </div>

            <div className="pr-2 text-end text-sm">
              <strong>Balance :</strong>
              <span className="mx-1 text-xs"> {userBalance}</span>
              <span className="text-xs">{token.symbol}</span>
            </div>
            <div className="border-gunmetal flex-start flex w-full flex-col border bg-white p-1 px-4">
              <p className="font-Teko text-start text-sm leading-relaxed font-semibold text-black/70">
                For
              </p>
              <p className="font-Teko text-start text-lg leading-relaxed font-semibold text-black">
                {vault.title} - {vault.token.symbol} Vault
              </p>
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
