import { AiFillInfoCircle } from 'react-icons/ai';
import VaultDetailDialog from './VaultDetailDialog';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { vaults } from '@/data/vaults';
import { useLiveFetch } from '@/lib/hooks/useFetch';
import { useUserLiveFetch } from '@/lib/hooks/useUserFetch';
import {
  useAppKitAccount,
  useAppKitNetworkCore,
  useAppKitProvider,
} from '@reown/appkit/react';
import { Eip1193Provider } from 'ethers';

export default function CurvanceXFastlaneCard({ index }: { index: number }) {
  const vault = vaults[index];
  const { isConnected } = useAppKitAccount();
  const { data: liveVaultsData, isLoading } = useLiveFetch();
  const { walletProvider }: { walletProvider: Eip1193Provider } =
    useAppKitProvider('eip155');
  const { chainId } = useAppKitNetworkCore();
  const { data: liveUserVaultsData } = useUserLiveFetch(
    walletProvider,
    chainId as string,
    index,
    isConnected
  );

  function daysUntil(): number {
    if (!liveVaultsData) return 0;
    const dateTimeStr = liveVaultsData[index]?.claimInPeriod;
    const targetDate = new Date(dateTimeStr);
    const now = new Date();

    const diffMs = targetDate.getTime() - now.getTime();

    if (diffMs <= 0) return 0;

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  return (
    <div className="border-gunmetal relative w-full max-w-[300px] overflow-hidden rounded-xl border-1 bg-white shadow max-md:max-w-[250px] max-sm:max-w-[400px]">
      <h2 className="bg-yellow mb-2 flex w-full items-center justify-center gap-2 rounded-[0%_0%_50%_50%_/_0%_0%_30%_30%] py-2 text-center text-lg font-semibold text-black">
        {vault.title}
        <HoverCard>
          <HoverCardTrigger asChild>
            <button type="button" aria-label="Information">
              <AiFillInfoCircle className="text-white" />
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="bg-yellow border-gunmetal w-[250px] rounded-xl border">
            <p className="text-center">
              View details on rewards, lock periods, and liquidity options by
              clicking Join the Vault.
            </p>
          </HoverCardContent>
        </HoverCard>
      </h2>
      <div className="flex justify-between px-2">
        <div className="border-gunmetal bg-cream flex w-full items-center justify-between rounded-xl border-1 px-3 py-1 text-sm font-bold max-sm:rounded-full">
          <img width="30" src="/images/monadCoin.webp" alt="coin" />
          {vault.token.symbol} Liquid NFT Vault
          <img width="20" src={vault.nftImage} alt="coin" />
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 px-1 py-4">
        <div
          style={{
            background: 'conic-gradient(#EC4444 0% 100%, transparent 65% 100%)',
          }}
          className="relative aspect-square w-[96px] rounded-full"
        >
          <img
            className="absolute top-1/2 left-1/2 h-[90px] w-[90px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-white bg-white"
            src={vault.img}
            alt={vault.title}
          />
        </div>
        <img width={40} src="/images/blueBolt.webp" alt="blue bolt" />
        <div
          style={{
            background: 'conic-gradient(transparent 0% 45%, #6617FC 45% 100%)',
          }}
          className="relative aspect-square w-[96px] rounded-full"
        >
          <img
            className="absolute top-1/2 left-1/2 h-[90px] w-[90px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-white bg-white"
            src="/images/cfCard2.webp"
            alt={vault.title}
          />
        </div>
      </div>
      <div className="border-gunmetal bg-cream mx-6 flex justify-between rounded-full border-1 px-2 py-1 text-sm">
        <span>Balance:</span>
        <span className="text-sienna mr-2 font-bold">
          {liveUserVaultsData ? liveUserVaultsData.balance : '-'}{' '}
        </span>
      </div>
      <div className="border-gunmetal bg-cream mx-6 flex justify-between rounded-full border-x-1 px-2 py-1 text-sm">
        <span>Net APY:</span>
        <span className="text-sienna mr-2 font-bold">
          {isLoading ? vault.apy :vault.apy}
           
            {/* (liveVaultsData?.[index]?.apy ?? vault.apy)}{' '} */}
          %
        </span>
      </div>
      <div className="border-gunmetal bg-cream mx-6 flex justify-between rounded-full border-1 px-2 py-1 text-sm">
        <span>Lock-in Period:</span>
        <span className="text-sienna font-bold">
          {liveVaultsData ? daysUntil() : vault.lockedInPeriod} Days
        </span>
      </div>
      <VaultDetailDialog index={index} />
    </div>
  );
}
