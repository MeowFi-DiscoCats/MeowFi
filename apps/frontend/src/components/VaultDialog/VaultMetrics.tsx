import { LuZap } from 'react-icons/lu';
import HourGlass from '../svg/HourGlass';
import Scale from '../svg/Scale';
import Triangle from '../svg/Triangle';
import { IVault } from '../../../../backend/src/models/IVault';
import { useEffect, useState } from 'react';
import { Contract, ethers } from 'ethers';
import { nativeTimeVaultAbi } from '@/lib/abi.data';
import { formatSmallNumber } from '@/lib/VaultHelper';
import { dataArr } from '@/lib/default';

interface VaultMetricsState {
  yieldValue: number;
  backingRatio: number;
  backingPercentage: number;
  lockin: number;
}

export function VaultMetrics({ index }: { index: number }) {
  const vaults: IVault[] = dataArr;
  const vault = vaults[index];

  const [vaultMetrics, setVaultMetrics] = useState<VaultMetricsState>({
    yieldValue: vault.yieldValue || 0,
    backingRatio: vault.backingRatio || 0,
    backingPercentage: vault.backingPercentage || 0,
    lockin: 0
  });

  const formatToTwoDecimals = (value: number): string => {
    return value.toFixed(2);
  };

  useEffect(() => {
    if (!vault.proxyAddress) return;

    const fetchVaultMetrics = async () => {
      try {
        const provider = new ethers.JsonRpcProvider(
          import.meta.env.VITE_ALCHEMY_URL
        );
        const proxyContract = new Contract(
          vault.proxyAddress,
          nativeTimeVaultAbi,
          provider
        );

        // Fetch all contract data separately with individual error handling
let nftCount, totalFunds, joiningPeriod, claimingPeriod, yieldedFunds, nftPrice;

try {
  nftCount = await proxyContract.getNftCount();
} catch (error) {
  console.error('Error fetching NFT count:', error);
  nftCount = 0; // Default fallback value
}

try {
  totalFunds = await proxyContract.totalFunds();
} catch (error) {
  console.error('Error fetching total funds:', error);
  totalFunds = 0;
}

try {
  joiningPeriod = await proxyContract.joiningPeriod();
} catch (error) {
  console.error('Error fetching joining period:', error);
  joiningPeriod = 0;
}

try {
  claimingPeriod = await proxyContract.claimingPeriod();
} catch (error) {
  console.error('Error fetching claiming period:', error);
  claimingPeriod = 0;
}

try {
  yieldedFunds = await proxyContract.yieldedFunds();
} catch (error) {
  console.error('Error fetching yielded funds:', error);
  yieldedFunds = 0;
}

try {
  nftPrice = await proxyContract.nftPrice();
} catch (error) {
  console.error('Error fetching NFT price:', error);
  nftPrice = 0;
}

        const lockinDays = Math.floor(
          (Number(claimingPeriod) - Number(joiningPeriod)) / 86400
        );

        const nftCountValue = Number(nftCount);
        const totalFundsValue = Number(totalFunds);
        const yieldedFundsValue = Number(yieldedFunds);
        const activeNftPrice = Number(nftPrice);

        const yieldValue = yieldedFundsValue > 0 
          ? yieldedFundsValue - totalFundsValue 
          : 0;
        
        const backingRatio = yieldedFundsValue > 0
          ? yieldedFundsValue / (nftCountValue * activeNftPrice)
          : 1;
        
        const backingPercentage = backingRatio * 100;

        setVaultMetrics({
          yieldValue,
          backingRatio,
          backingPercentage,
          lockin: lockinDays
        });

      } catch (error) {
        console.error('Error fetching vault metrics:', error);
      }
    };

    fetchVaultMetrics();
  }, [vault.proxyAddress, vault.tokenAddress]);

  return (
    <div className="flex flex-1 flex-col justify-end">
      {/* Vault Info Header */}
      <div className="flex items-center justify-between gap-2 rounded-xl border border-gunmetal bg-white p-2">
        <div className="flex items-center gap-2">
          <img
            width={30}
            className="p-[1px] shadow"
            src="/images/sumerNFT.webp"
            alt="NFTs"
          />
          <div>
            <p>Vault Info</p>
            <p className="font-Teko text-xl font-semibold tracking-wider">
              {vault.totalSupply} @ {vault.price} {vault.tokenSymbol}
            </p>
          </div>
        </div>
        <img 
          width={30} 
          src="/images/lightingBolt.webp" 
          alt="points" 
        />
      </div>

      {/* Metrics Grid */}
      <div className="mt-4 flex max-h-[330px] min-h-72 w-full flex-1 gap-3">
        {/* Left Column */}
        <div className="flex flex-1 flex-col gap-3">
          {/* Yield Generated Card */}
          <div className="relative flex flex-1 flex-col items-center justify-end gap-2 rounded-xl bg-gunmetal p-4 text-white">
            <div className="absolute top-4 left-0 h-full w-full">
              <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 transform drop-shadow-[0_0_6px_rgba(255,255,0,0.6)]">
                <Triangle />
              </div>
              <Scale />
            </div>
            <p className="font-Teko font-semibold">
              <span className="mr-1">
                ${formatSmallNumber(vaultMetrics.yieldValue.toString())}
              </span>
              {vault.tokenSymbol}
            </p>
            <p className="text-center text-sm font-thin">Yield Generated</p>
          </div>

          {/* Lockin Period Card */}
          <div className="flex flex-1 items-center justify-center rounded-xl bg-gunmetal p-4">
            <div className="flex items-center justify-center gap-2 text-white">
              <HourGlass />
              <div>
                <p className="font-Teko text-3xl font-semibold">
                  {vaultMetrics.lockin}D
                </p>
                <p className="font-thin">Remaining</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Backing Metrics */}
        <div className="flex flex-1 flex-col rounded-xl bg-gunmetal p-3">
          <h5 className="text-center font-thin text-white">Backing</h5>
          <div className="mx-auto mt-4 mb-1 h-4 w-10 rounded-full border-2 border-white/12 bg-white/10" />
          
          <div className="relative w-full flex-1">
            <div
              className="absolute bottom-2 left-2 max-h-[calc(100%-16px)] w-[calc(100%-16px)] rounded-xl bg-amber"
              style={{
                height: `${formatToTwoDecimals(vaultMetrics.backingPercentage)}%`,
              }}
            />
            
            <div className="relative z-20 flex h-full flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-white/12 bg-white/10 backdrop-blur-sm">
              <p className="font-Teko flex items-center text-xl text-white">
                <LuZap /> 
                <span className="font-Teko mr-1 text-xl">Ratio:</span>
                {formatToTwoDecimals(vaultMetrics.backingRatio)}
              </p>
              <p className="font-Teko text-3xl font-bold text-white">
                {formatToTwoDecimals(vaultMetrics.backingPercentage)}
                <span className="font-Teko ml-1 text-sm">%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}