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
import { BrowserProvider, Contract, Eip1193Provider } from 'ethers';
import { useUserLiveFetch } from '@/lib/hooks/useUserFetch';
import { vaults } from '@/data/vaults';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import ClaimCountDown from './ClaimCountdown';
import { useLiveFetch } from '@/lib/hooks/useFetch';

export default function ClaimDialog({ index }: { index: number }) {
  const vault = vaults[index];
  const { data: liveVaultsData } = useLiveFetch();
  const claimInPeriod = liveVaultsData
    ? liveVaultsData[index].claimInPeriod
    : vault.claimInPeriod;
  const targetDate = new Date(claimInPeriod).getTime();
  const [isClaimPeriodStart, setIsClaimPeriodStart] = useState(
    targetDate < Date.now()
  );
  const [status, setStatus] = useState('Claim');
  const [open, setOpen] = useState(false);

  const { isConnected } = useAppKitAccount();
  const { walletProvider }: { walletProvider: Eip1193Provider } =
    useAppKitProvider('eip155');
  const { chainId } = useAppKitNetworkCore();
  const { data: liveUserVaultsData } = useUserLiveFetch(
    walletProvider,
    chainId as string,
    index,
    isConnected
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isClaimPeriodStart) setOpen(false);
    if (!isClaimPeriodStart) {
      const delay = targetDate - Date.now();
      if (delay >= 2147483647) return;
      const timeout = setTimeout(() => {
        setIsClaimPeriodStart(true);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [isClaimPeriodStart, targetDate]);

  async function handleClaim() {
    if (!isConnected) {
      toast('Please connect your wallet.');
      return;
    }

    const provider = new BrowserProvider(walletProvider, chainId);
    const signer = await provider.getSigner();

    setStatus('Claiming...');
    if (liveUserVaultsData?.nftAmount == 0) {
      toast('You have no NFTs to claim');
      setStatus('Claim');
      return;
    }
    console.log('Claiming...');
    try {
      const proxyContract = new Contract(
        vault.proxyAddress,
        [
          'function nftAddress() view returns (address)',
          'function claimBack()',
        ],
        signer
      );
      const NFTAddress = await proxyContract.nftAddress();
      if (!NFTAddress) {
        toast('Claim failed', { description: 'NFT contract not found' });
        return;
      }

      const nftContract = new Contract(
        NFTAddress,
        ['function setApprovalForAll(address,bool)'],
        signer
      );
      const tx2 = await nftContract.setApprovalForAll(vault.proxyAddress, true);
      const conf2 = await tx2.wait();

      if (conf2) {
        toast('Nft Approval successful', {
          description: 'claim your funds Next',
        });
        const claimTx = await proxyContract.claimBack();
        const receipt = await claimTx.wait();
        if (receipt) {
          toast('Claim successful', { description: 'received your funds' });
        }
      }
      console.log('Claim transaction:');

      setOpen(false);
      setStatus('Claim');
      queryClient.invalidateQueries({
        queryKey: ['liveVaultsData', 'liveUserVaultsData'],
      });
    } catch (error) {
      console.error('Error during claim:', error);
      toast('Claim failed', { description: 'Please try again' });
      setStatus('Claim');
    }
  }
  function validate() {
    if (!isConnected) {
      toast('Please connect your wallet.');
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        disabled={!isClaimPeriodStart}
        onClick={validate}
        className={`${
          !isClaimPeriodStart ? 'cursor-not-allowed' : 'hover:bg-amber-400'
        } bg-amber mx-auto w-full py-1 text-black`}
      >
        <ClaimCountDown targetDate={claimInPeriod} />
      </DialogTrigger>
      <DialogContent className="bg-cream border-gunmetal rounded-3xl">
        <DialogHeader>
          <DialogTitle className="font-Teko text-center text-3xl font-semibold">
            Claim Your Liquidity
          </DialogTitle>
          <DialogDescription className="hidden text-center text-sm font-semibold">
            This is a confirmation of your claim. Please ensure that the wallet
            address you are using is correct.
          </DialogDescription>
          <section>
            <div className="mt-4 flex items-center justify-between">
              <p className="font-Teko font-semibold">You are Claiming</p>
            </div>
            <div className="border-gunmetal mt-1 flex items-center justify-between rounded-xl border p-2">
              <div className="bg-yellow border-gunmetal flex-1 rounded-xl border p-1 px-4 text-center">
                {liveUserVaultsData ? liveUserVaultsData.tokenAmount : 0}
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
            <p className="font-Teko mt-4 font-semibold">For</p>
            <div className="border-gunmetal font-Teko mt-1 flex items-center justify-center rounded-xl border p-3 text-center text-lg font-semibold">
              {liveUserVaultsData ? liveUserVaultsData.nftAmount : 0}{' '}
              {vault.title} Vaults NFTs
            </div>
            <div className="mt-4 flex items-center justify-center">
              <Button
                onClick={handleClaim}
                className="bg-yellow font-Teko border-gunmetal border px-[20%] py-2 text-xl font-semibold text-black hover:bg-yellow-300"
                disabled={!isClaimPeriodStart}
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
