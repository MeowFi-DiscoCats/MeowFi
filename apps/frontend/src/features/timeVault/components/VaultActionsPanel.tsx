import { useEffect, useState } from 'react';
import { Eip1193Provider, ethers } from 'ethers';
import { vaults } from '@/data/vaults';
import Countdown from './Countdown';
import {
  useAppKitAccount,
  useAppKitNetworkCore,
  useAppKitProvider,
} from '@reown/appkit/react';
import { toast } from 'sonner';
import DepositDialog from './DepositDialog';
import ClaimDialog from './ClaimDialog';
import { useLiveFetch } from '@/lib/hooks/useFetch';
import { useUserLiveFetch } from '@/lib/hooks/useUserFetch';

export function VaultActions({ index }: { index: number }) {
  const vault = vaults[index];
  const [quantity, setQuantity] = useState<number>(1);
  const { walletProvider }: { walletProvider: Eip1193Provider } =
    useAppKitProvider('eip155');
  const { chainId } = useAppKitNetworkCore();

  const { isConnected } = useAppKitAccount();

  const { data: liveUserVaultsData } = useUserLiveFetch(
    walletProvider,
    chainId as string,
    index,
    isConnected
  );

  const { data: liveVaultsData } = useLiveFetch();
  const joinInPeriod = liveVaultsData
    ? liveVaultsData[index].joinInPeriod
    : vault.joinInPeriod;
  const prejoinPeriod = liveVaultsData
    ? liveVaultsData[index].prejoinPeriod
    : vault.prejoinPeriod;

  const handleQuantity = () => {
    const userAmount = liveUserVaultsData?.nftAmount;
    if (userAmount !== undefined && userAmount >= vault.nftLimit) {
      toast('You have reached the maximum NFT limit');
      return;
    }
    const limit = userAmount !== undefined ? vault.nftLimit : 10;
    setQuantity(Math.min(limit, quantity + 1));
  };

  useEffect(() => {
    if (!isConnected) {
      toast('Please connect your wallet.');
    }
  }, [isConnected]);

  return (
    <div className="mt-auto flex flex-1 flex-col gap-3">
      <p className="border-crimson border-y p-1 text-center font-semibold">
        <Countdown joinDate={joinInPeriod} preJoinDate={prejoinPeriod} />
      </p>
      <div className="border-gunmetal bg-yellow flex justify-between rounded-lg border p-2 font-semibold">
        <span>Vault Supply:</span>
        <span className="font-Teko tracking-wider">
          {liveVaultsData
            ? liveVaultsData[index].getNftCount
            : vault.availableSupply}
          /{vault.totalSupply}
        </span>
      </div>
      <div className="border-gunmetal flex justify-between rounded-lg border bg-white p-1">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-2"
          disabled={quantity <= 1}
        >
          -
        </button>
        <div>{quantity}</div>
        <button
          onClick={handleQuantity}
          className="px-2"
          disabled={quantity < vault.availableSupply}
        >
          +
        </button>
      </div>
      <p className="-my-3 text-end text-sm">
        Balance:
        <span className="mx-1">
          {liveUserVaultsData?.balance ? `${liveUserVaultsData?.balance}` : '0'}
        </span>
        {vault.token.symbol}
      </p>
      <div className="flex gap-2">
        <DepositDialog index={index} quantity={quantity} />
        <button
          // onClick={handleWithdraw}
          className="flex-1 rounded-lg border border-gray-400 bg-white p-1 text-center font-semibold text-gray-400 hover:bg-gray-100"
          disabled
        >
          widthrow
        </button>
      </div>
      <div className="border-gunmetal flex flex-col overflow-hidden rounded-lg border">
        <div className="flex bg-white">
          <div className="border-gunmetal flex-1 border-r border-b p-1 text-center">
            Holdings
          </div>
          <div className="border-gunmetal flex-1 border-b p-1 text-center">
            Amount
          </div>
        </div>
        <div className="flex bg-white">
          <div className="border-gunmetal flex-1 border-r border-b p-1 text-center">
            {liveUserVaultsData ? liveUserVaultsData.nftAmount : 0} NFTs
          </div>
          <div className="border-gunmetal flex-1 border-b p-1 text-center">
            {liveUserVaultsData ? ethers.formatUnits(Number(liveUserVaultsData.tokenAmount).toString())   : 0}
            <span className="ml-0.5"> {vault.token.symbol}</span>
          </div>
        </div>
        <div className="bg-cream flex items-center justify-center gap-2 p-2 text-xs">
          <img width="20" height="20" src="/images/info.webp" alt="info" />
          You will be able to claim your initial funds along with the yield
          generated after the lock-up period.
        </div>
        <ClaimDialog index={index} />
      </div>
    </div>
  );
}
