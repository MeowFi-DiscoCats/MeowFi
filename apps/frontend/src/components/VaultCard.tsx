import { AiFillInfoCircle } from 'react-icons/ai';
import VaultDialog from './VaultDialog';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { IVault } from '../../../backend/src/models/IVault';
import { useEffect, useState } from 'react';
import { Contract, ethers } from 'ethers';
import { nativeTimeVaultV2Abi } from '@/lib/abi';
import { formatSmallNumber } from '@/lib/VaultHelper';

export default function VaultCard({
  index,
  vault,
}: {
  index: number;
  vault: IVault;
}) {
  // const [decimals, setdecimals] = useState(0);

  const [vaultMetrics, setVaultMetrics] = useState({
    yieldValue: vault.yieldValue || vault.yieldValue,
    locingPeriod: 0,
    backingPercentage: vault.backingPercentage || vault.backingPercentage,
  });

  useEffect(() => {
    if (!vault.proxyAddress) return;
    const fetchVaultMetrics = async () => {
      try {
        const provider = new ethers.JsonRpcProvider(
          import.meta.env.VITE_ALCHEMY_URL
        );
        const proxyContract = new Contract(
          vault.proxyAddress,
          nativeTimeVaultV2Abi,
          provider
        );

        // setdecimals(18);

        const [nftCount, totalFunds] = await Promise.all([
          proxyContract.getNftCount(),
          proxyContract.totalFunds(),
        ]);
        const yieldedFunds = await proxyContract.yieldedFunds();
        const nftPrice = await proxyContract.nftPrice();
        const joiningPeriod = await proxyContract.joiningPeriod();
        const claimingPeriod = await proxyContract.claimingPeriod();
        const dayLocin = Math.floor(
          (Number(claimingPeriod) - Number(joiningPeriod)) / 86400
        );
        console.log(nftCount);
        const nftCountValue = Number(nftCount);
        const totalFundsValue = Number(totalFunds);
        const yieldedFundsValue = Number(yieldedFunds);
        const activenftPrice = Number(nftPrice);

        const yieldValue =
          yieldedFundsValue > 0 ? yieldedFundsValue - totalFundsValue : 0;
        const backingRatio =
          yieldedFundsValue > 0
            ? yieldedFundsValue / (nftCountValue * activenftPrice)
            : 1;
        const backingPercentage = backingRatio * 100;
        console.log(yieldValue);

        setVaultMetrics({
          yieldValue,
          locingPeriod: Number(dayLocin),
          backingPercentage,
        });
      } catch (error) {
        console.error('Error fetching vault metrics:', error);
      }
    };

    fetchVaultMetrics();
  }, [vault.proxyAddress]);

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
          {vault.price}
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
          {formatSmallNumber(vaultMetrics.yieldValue.toString())}
        </span>
      </div>
      <div className="border-gunmetal bg-cream mx-6 flex justify-between rounded-full border-x-1 px-2 py-1 text-sm">
        <span>Net APY:</span>
        <span className="text-sienna font-bold">
          {(18.5+(vaultMetrics.backingPercentage-100)).toString().slice(0, 6)}% 
        </span>
      </div>
      <div className="border-gunmetal bg-cream mx-6 flex justify-between rounded-full border-1 px-2 py-1 text-sm">
        <span>Lock-in Period:</span>
        <span className="text-sienna font-bold">
          {vaultMetrics.locingPeriod}
        </span>
      </div>
      <VaultDialog index={index} />
    </div>
  );
}
