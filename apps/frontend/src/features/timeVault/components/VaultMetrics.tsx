import { LuZap } from 'react-icons/lu';
import HourGlass from '@/components/svg/HourGlass';
import Scale from '@/components/svg/Scale';
import Triangle from '@/components/svg/Triangle';
import { vaults } from '@/data/vaults';
import { useLiveFetch } from '../hooks/useFetch';

export function VaultMetrics({ index }: { index: number }) {
  const vault = vaults[index];
  const { data: liveVaultsData } = useLiveFetch();

  return (
    <div className="flex flex-1 flex-col justify-end">
      <div className="border-gunmetal flex items-center justify-between gap-2 rounded-xl border bg-white p-2">
        <div className="flex items-center gap-2">
          <img
            width={30}
            className="p-[1px] shadow"
            src={vault.nftImage}
            alt="NFTs"
          />
          <div>
            <p>Vault Info</p>
            <p className="font-Teko text-xl font-semibold tracking-wider">
              {vault.totalSupply} @ {vault.nftPrice} {vault.token.symbol}
            </p>
          </div>
        </div>
        <img width={30} src="/images/lightingBolt.webp" alt="points" />
      </div>

      {/* Metrics Grid */}
      <div className="mt-4 flex max-h-[330px] min-h-72 w-full flex-1 gap-3">
        {/* Left Column */}
        <div className="flex flex-1 flex-col gap-3">
          {/* Yield Generated Card */}
          <div className="bg-gunmetal relative flex flex-1 flex-col items-center justify-end gap-2 rounded-xl p-4 text-white">
            <div className="absolute top-4 left-0 h-full w-full">
              <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 transform drop-shadow-[0_0_6px_rgba(255,255,0,0.6)]">
                <Triangle />
              </div>
              <Scale />
            </div>
            <p className="font-Teko font-semibold">
              <span className="mr-1">
                ${liveVaultsData ? liveVaultsData[0].yieldedFunds : 0}
              </span>
              {vault.token.symbol}
            </p>
            <p className="text-center text-sm font-thin">Yield Generated</p>
          </div>

          {/* Lockin Period Card */}
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

        {/* Right Column - Backing Metrics */}
        <div className="bg-gunmetal flex flex-1 flex-col rounded-xl p-3">
          <h5 className="text-center font-thin text-white">Backing</h5>
          <div className="mx-auto mt-4 mb-1 h-4 w-10 rounded-full border-2 border-white/12 bg-white/10" />

          <div className="relative w-full flex-1">
            <div
              className="bg-amber absolute bottom-2 left-2 max-h-[calc(100%-16px)] w-[calc(100%-16px)] rounded-xl"
              style={{
                height: `${liveVaultsData ? liveVaultsData[index].backingPercent : 100}%`,
              }}
            />

            <div className="relative z-20 flex h-full flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-white/12 bg-white/10 backdrop-blur-sm">
              <p className="font-Teko flex items-center text-xl text-white">
                <LuZap />
                <span className="font-Teko mr-1 text-xl">Ratio:</span>
                {liveVaultsData
                  ? liveVaultsData[index].backingPercent / 100
                  : 1}
              </p>
              <p className="font-Teko text-3xl font-bold text-white">
                {liveVaultsData ? liveVaultsData[index].backingPercent : 100}
                <span className="font-Teko ml-1 text-sm">%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
