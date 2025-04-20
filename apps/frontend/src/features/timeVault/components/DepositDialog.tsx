import YellowBolt from '@/components/svg/YellowBolt';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  useAppKitAccount,
  useAppKitNetworkCore,
  useAppKitProvider,
} from '@reown/appkit/react';
import { BrowserProvider, Contract, Eip1193Provider, ethers } from 'ethers';
import { useUserLiveFetch } from '../hooks/useUserFetch';
import { vaults } from '@/data/vaults';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

export default function DepositDialog({
  quantity,
  index,
}: {
  quantity: number;
  index: number;
}) {
  const vault = vaults[index];
  const targetDate = new Date(vault.joinInPeriod).getTime();
  const [isJoinPeriodEnd, setIsJoinPeroidEnd] = useState(
    Date.now() > targetDate
  );

  useEffect(() => {
    if (!isJoinPeriodEnd) {
      const delay = targetDate - Date.now();
      const timeout = setTimeout(() => {
        setIsJoinPeroidEnd(true);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [isJoinPeriodEnd, targetDate]);

  const { isConnected, address } = useAppKitAccount();
  const { walletProvider }: { walletProvider: Eip1193Provider } =
    useAppKitProvider('eip155');
  const { chainId } = useAppKitNetworkCore();

  const { data: liveUserVaultsData } = useUserLiveFetch(
    walletProvider,
    chainId as string,
    index,
    isConnected
  );

  const [status, setStatus] = useState('Deposit');
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  async function handleDeposit() {
    if (!isConnected) {
      toast('Please connect your wallet.');
      return;
    }
    const provider = new BrowserProvider(walletProvider, chainId);
    const signer = await provider.getSigner();

    setStatus('Depositing...');

    try {
      const amount = ethers.parseUnits(
        (quantity * vault.nftPrice).toString(),
        vault.token.decimals
      );

      if (vault.token.isErc20) {
        const tokenContract = new Contract(
          vault.token.address,
          ['function approve(address spender, uint256 amount) returns (bool)'],
          signer
        );
        const approval = await tokenContract.approve(
          vault.proxyAddress,
          amount
        );

        const receiptApproval = await approval.wait();
        if (receiptApproval) {
          toast('Approval successful', {
            description: 'You have successfully Approved',
          });
          const proxyContract = new Contract(
            vault.proxyAddress,
            [
              'function joinVault(uint256 amount, address userAddress) external',
            ],
            signer
          );
          const depositTx = await proxyContract.joinVault(quantity, address);

          const receipt = await depositTx.wait();
          if (receipt) {
            toast('Deposit successful', {
              description: 'You have successfully deposited',
            });
          }
        }
      } else {
        const proxyContract = new Contract(
          vault.proxyAddress,
          ['function joinVault(uint256 amount) external'],
          signer
        );

        const depositTx = await proxyContract.joinVault(quantity);
        const receipt = await depositTx.wait();
        if (receipt) {
          toast('Deposit successful', {
            description: 'You have successfully deposited',
          });
        }
      }
      setOpen(false);
      setStatus('Deposit');
      queryClient.invalidateQueries({
        queryKey: ['liveVaultsData', 'liveUserVaultsData'],
      });
    } catch (error) {
      console.error('Error during deposit:', error);
      toast('Deposit failed', {
        description: 'Please try again',
      });
      setStatus('Deposit');
    }
  }

  function validate() {
    if (!isConnected) {
      toast('Please connect your wallet.');
    }
    if (!isJoinPeriodEnd) {
      toast('Join period has ended.');
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        onClick={validate}
        className={`${
          isJoinPeriodEnd
            ? 'cursor-not-allowed border-gray-400 text-gray-400 hover:bg-gray-400/10'
            : 'bg-amber border-gunmetal text-black hover:bg-amber-400'
        } relative mx-auto rounded-lg border px-12 font-semibold`}
      >
        Deposit
        <div className="border-gunmetal absolute -top-0.25 -right-0.25 flex rounded-full border bg-[#671afc] px-1 py-0.5 text-[8px] text-white">
          Zap
          <span className="w-2.5">
            <YellowBolt />
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-cream border-gunmetal rounded-3xl">
        <DialogHeader>
          <DialogTitle className="font-Teko text-center text-3xl font-semibold">
            Deposit Confirmation
          </DialogTitle>
          <DialogDescription className="hidden text-center text-sm font-semibold">
            This is a confirmation of your deposit. Please ensure that the
            wallet address you are using is correct.
          </DialogDescription>
          <section>
            <div className="mt-4 flex items-center justify-between">
              <p className="font-Teko font-semibold">You are Depositing</p>

              <p className="text-end text-sm font-semibold">
                Balance:
                <span className="mx-1">
                  {liveUserVaultsData?.balance
                    ? `${liveUserVaultsData?.balance}`
                    : '0'}
                </span>
                {vault.token.symbol}
              </p>
            </div>
            <div className="border-gunmetal mt-2 flex items-center justify-between rounded-xl border p-2">
              <div className="bg-yellow border-gunmetal flex-1 rounded-xl border p-1 px-4 text-center">
                {quantity * vault.nftPrice}
              </div>
              <div className="flex flex-1 items-center justify-end gap-2 px-4">
                <span>{vault.token.symbol}</span>
                <img
                  width={20}
                  className="aspect-square rounded-xl"
                  src={vault.token.img}
                />
              </div>
            </div>
            <div className="relative mt-4 flex items-center justify-end gap-2">
              <span>Not Enough Balance?</span>
              <a className="border-gunmetal flex rounded-full border bg-[#671afc] px-2 py-0.5 text-[12px] text-nowrap text-white">
                <span>Zap it</span>
                <span className="w-4">
                  <YellowBolt />
                </span>
              </a>
            </div>
            <p className="font-Teko font-semibold">For</p>
            <div className="border-gunmetal font-Teko mt-2 flex items-center justify-center rounded-xl border p-3 text-center text-lg font-semibold">
              {quantity} {vault.title} Vaults NFTs
            </div>
            <div className="mt-4 flex items-center justify-center">
              <Button
                onClick={handleDeposit}
                className="bg-yellow font-Teko border-gunmetal border px-[20%] py-2 text-xl font-semibold text-black hover:bg-yellow-300"
                disabled={isJoinPeriodEnd}
              >
                {status}
              </Button>
            </div>
          </section>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
