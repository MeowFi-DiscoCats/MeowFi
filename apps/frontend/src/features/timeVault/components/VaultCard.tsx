import { AiFillInfoCircle } from 'react-icons/ai';
import VaultDetailDialog from './VaultDetailDialog';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { vaults } from '@/data/vaults';
import { useLiveFetch } from '@/lib/hooks/useFetch';

export default function VaultCard({ index }: { index: number }) {
  const vault = vaults[index];
  const { data: liveVaultsData, isLoading } = useLiveFetch();

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
        <div className="border-gunmetal bg-cream text-sienna flex items-center rounded-xl border-1 px-3 font-bold max-sm:rounded-full">
          <img width="30" src="/images/monadCoin.webp" alt="coin" />
          {vault.nftPrice}
        </div>
        <div className="border-gunmetal text-sienna bg-cream flex items-center gap-2 rounded-xl border-1 px-3 py-1 font-bold max-sm:rounded-full">
          <img
            width="17"
            className="p-[1px] shadow"
            src="/images/sumerNFT.webp"
            alt="total"
          />
          {vault.totalSupply}
        </div>
      </div>
      <div className="-mt-2 mb-4 flex justify-center">
        <div
          style={{
            background: 'conic-gradient(#b91c1c 0% 65%, transparent 65% 100%)',
          }}
          className="relative aspect-square w-[130px] rounded-full"
        >
          <img
            className="absolute top-1/2 left-1/2 h-[126px] w-[126px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-white bg-white"
            src={vault.img}
            alt={vault.title}
          />
        </div>
      </div>
      <div className="border-gunmetal bg-cream mx-6 flex justify-between rounded-full border-1 px-2 py-1 text-sm">
        <span>Earnings:</span>
        <span className="text-sienna font-bold">
          {isLoading ? 0 : (liveVaultsData?.[index]?.yieldedFunds ?? 0)}{' '}
          {vault.token.symbol}
        </span>
      </div>
      <div className="border-gunmetal bg-cream mx-6 flex justify-between rounded-full border-x-1 px-2 py-1 text-sm">
        <span>Net APY:</span>
        <span className="text-sienna mr-2 font-bold">
          {isLoading ? vault.apy : (liveVaultsData?.[index]?.apy ?? vault.apy)}{' '}
          %
        </span>
      </div>
      <div className="border-gunmetal bg-cream mx-6 flex justify-between rounded-full border-1 px-2 py-1 text-sm">
        <span>Lock-in Period:</span>
        <span className="text-sienna font-bold">
          {vault.lockedInPeriod} Days
        </span>
      </div>
      <VaultDetailDialog index={index} />
    </div>
  );
}
