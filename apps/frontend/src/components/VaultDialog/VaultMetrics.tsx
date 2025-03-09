import { LuZap, LuCheck } from 'react-icons/lu';
import AirDrop from '../svg/AirDrop';
import HourGlass from '../svg/HourGlass';
import Scale from '../svg/Scale';
import { useQueryClient } from '@tanstack/react-query';
import { IVault } from '../../../../backend/src/models/vault';

export function VaultMetrics({ index }: { index: number }) {
  const queryClient = useQueryClient();
  const vaults: IVault[] = queryClient.getQueryData(['vaults'])!;
  const vault = vaults[index];

  return (
    <div className="mt-9 flex flex-1 flex-col justify-end">
      <div className="from-crimson/50 to-crimson mx-4 flex items-center gap-2 rounded-xl bg-gradient-to-t p-2 text-white">
        <AirDrop />
        <div>
          <p>Points {vault.AirdropIncentivised}x</p>
          <h4 className="font-Teko font-semibold">Airdrop Incentivised</h4>
        </div>
        <LuCheck size="30px" className="ml-auto" />
      </div>
      <div className="mt-4 flex min-h-72 w-full flex-1 gap-3">
        <div className="flex flex-1 flex-col gap-3">
          <div className="bg-gunmetal relative flex flex-1 flex-col items-center justify-end gap-2 rounded-xl p-4 text-white">
            <div className="absolute top-4 left-0 h-full w-full">
              <Scale />
            </div>
            <p className="font-Teko font-semibold">
              <span className="text-2xl">{vault.yieldValue} </span>
              {vault.tokenSymbol}
            </p>
            <p className="text-center text-sm font-semibold">Yield Generated</p>
          </div>
          <div className="bg-gunmetal flex flex-1 items-center justify-center rounded-xl p-4">
            <div className="flex items-center justify-center gap-2 text-white">
              <HourGlass />
              <div>
                <p className="font-Teko text-3xl font-semibold">
                  {vault.lockedInPeriod}D
                </p>
                <p>Time-Lock</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gunmetal flex flex-1 flex-col rounded-xl p-3">
          <h5 className="text-center font-thin text-white">Backing</h5>
          <div className="mx-auto mt-4 mb-1 h-4 w-10 rounded-full border border-white/12 bg-white/10" />
          <div className="relative w-full flex-1">
            <div
              className="bg-amber absolute bottom-2 left-2 max-h-[calc(100%-16px)] w-[calc(100%-16px)] rounded-xl"
              style={{ height: `${vault.backingPercentage}%` }}
            />
            <div className="relative z-20 flex h-full flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-white/12 bg-white/10 backdrop-blur-sm">
              <p className="font-Teko flex items-center gap-2 text-xl text-white">
                <LuZap /> Ratio: {vault.backingRatio}
              </p>
              <p className="font-Teko text-3xl font-bold text-white">
                {vault.backingPercentage}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
