import { LuZap, LuCheck } from 'react-icons/lu';
import AirDrop from '../svg/AirDrop';
import HourGlass from '../svg/HourGlass';
import Scale from '../svg/Scale';
// import { useQueryClient } from '@tanstack/react-query';
import { IVault } from '../../../../backend/src/models/IVault';
import { useEffect, useState } from 'react';
import { Contract, ethers } from 'ethers';
import { nativeTimeVaultAbi } from '@/lib/abi.data';
import {  formatSmallNumber } from '@/lib/VaultHelper';
import Triangle from '../svg/Triangle';
import { dataArr } from '@/lib/default';

export function VaultMetrics({ index }: { index: number }) {
  // const queryClient = useQueryClient();
  // const vaults: IVault[] = queryClient.getQueryData(['vaults'])!;
  const vaults: IVault[] = dataArr

  const vault = vaults[index];
  // const [decimals, setdecimals] = useState(0);

  const [vaultMetrics, setVaultMetrics] = useState({
    yieldValue: vault.yieldValue || vault.yieldValue,
    backingRatio: vault.backingRatio || vault.backingRatio,
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
          nativeTimeVaultAbi,
          provider
        );
        // const tokenContract = new Contract(
        //   vault.tokenAddress,
        //   tokenAbi,
        //   provider
        // );

        // const decimal = await tokenContract.decimals();
        // setdecimals(18);

        const [nftCount, totalFunds] = await Promise.all([
          proxyContract.getNftCount(),
          proxyContract.totalFunds(),
        ]);
        const yieldedFunds = await proxyContract.yieldedFunds();
        const nftPrice = await proxyContract.nftPrice();
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

        setVaultMetrics({
          yieldValue,
          backingRatio,
          backingPercentage,
        });
      } catch (error) {
        console.error('Error fetching vault metrics:', error);
      }
    };

    fetchVaultMetrics();
  }, [vault.proxyAddress, vault.tokenAddress]);

  const formatToTwoDecimals = (value: number) => {
    return parseFloat(value.toFixed(2));
  };

  return (
    <div className="mt-9 flex flex-1 flex-col justify-end">
      <div className="from-crimson/50 to-crimson mx-4 flex items-center gap-2 rounded-xl bg-gradient-to-t p-2 text-white">
        <AirDrop />
        <div>
          <p className="font-thin">Extra Fries !!</p>
          <h4 className="font-Teko font-semibold">Airdrop Incentivised</h4>
        </div>
        <LuCheck size="30px" className="ml-auto" />
      </div>
      <div className="mt-4 flex min-h-72 w-full flex-1 gap-3">
        <div className="flex flex-1 flex-col gap-3">
          <div className="bg-gunmetal relative flex flex-1 flex-col items-center justify-end gap-2 rounded-xl p-4 text-white">
            <div className="absolute top-4 left-0 h-full w-full">
              <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 transform drop-shadow-[0_0_6px_rgba(255,255,0,0.6)]">
                <Triangle />
              </div>

              <Scale />
            </div>
            <p className="font-Teko font-semibold">
              <span className="mr-1 text- ">
                ${(formatSmallNumber(vaultMetrics.yieldValue.toString()))}
              </span>
              {vault.tokenSymbol}
            </p>
            <p className="text-center text-sm font-thin">Yield Generated</p>
          </div>
          <div className="bg-gunmetal flex flex-1 items-center justify-center rounded-xl p-4">
            <div className="flex items-center justify-center gap-2 text-white">
              <HourGlass />
              <div>
                <p className="font-Teko text-3xl font-semibold">
                  {vault.lockedInPeriod}D
                </p>
                <p className="font-thin">Remaining</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gunmetal flex flex-1 flex-col rounded-xl p-3">
          <h5 className="text-center font-thin text-white">Backing</h5>
          <div className="mx-auto mt-4 mb-1 h-4 w-10 rounded-full border-2 border-white/12 bg-white/10" />
          <div className="relative w-full flex-1">
            <div
              className="bg-amber absolute bottom-2 left-2 max-h-[calc(100%-16px)] w-[calc(100%-16px)] rounded-xl"
              style={{
                height: `${formatToTwoDecimals(vaultMetrics.backingPercentage)}%`,
              }}
            />
            <div className="relative z-20 flex h-full flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-white/12 bg-white/10 backdrop-blur-sm">
              <p className="font-Teko flex items-center text-xl text-white">
                <LuZap /> <span className="font-Teko mr-1 text-xl">Ratio:</span>
                {formatToTwoDecimals(vaultMetrics.backingRatio).toFixed(2)}
              </p>
              <p className="font-Teko text-3xl font-bold text-white">
                {formatToTwoDecimals(vaultMetrics.backingPercentage).toFixed(2)}
                <span className="font-Teko ml-1 text-sm">%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
