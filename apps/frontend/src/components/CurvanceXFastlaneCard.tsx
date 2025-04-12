import { AiFillInfoCircle } from 'react-icons/ai';
import VaultDialog from './VaultDialog';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { IVault } from '../../../backend/src/models/IVault';
import { useEffect, useState, useMemo } from 'react';
import { BrowserProvider, Contract, Eip1193Provider, ethers } from 'ethers';
import { useAppKitAccount, useAppKitNetworkCore, useAppKitProvider } from '@reown/appkit/react';
import { toast } from 'sonner';

interface VaultMetrics {
  yieldValue: number;
  lockingPeriod: number;
  backingPercentage: number;
  isLoading: boolean;
}

interface UserHoldings {
  tokenAmount: number;
  nftAmount: number;
  isLoading: boolean;
}

export default function CurvanceXFastlaneCard({
  index,
  vault,
}: {
  index: number;
  vault: IVault;
}) {
  const [decimals, setDecimals] = useState<number>(0);
  const [nftTotal, setNftTotal] = useState<number>(0);
  const [holdings, setHoldings] = useState<UserHoldings>({
    tokenAmount: 0,
    nftAmount: 0,
    isLoading: true,
  });
  const [vaultMetrics, setVaultMetrics] = useState<VaultMetrics>({
    yieldValue: vault.yieldValue || 0,
    lockingPeriod: vault.lockedInPeriod || 0,
    backingPercentage: vault.backingPercentage || 100,
    isLoading: true,
  });

  const { address } = useAppKitAccount();
  const { walletProvider }: { walletProvider: Eip1193Provider } = useAppKitProvider('eip155');
  const { chainId } = useAppKitNetworkCore();

  useEffect(() => {
    if (!vault.proxyAddress) return;

    const fetchVaultData = async () => {
      try {
        const provider = new ethers.JsonRpcProvider(
          import.meta.env.VITE_ALCHEMY_URL
        );
        const proxyContract = new Contract(
          vault.proxyAddress,
          vault.abi,
          provider
        );

        // Fetch decimals
        if (vault.isErc20) {
          const tokenContract = new Contract(
            vault.tokenAddress,
            vault.tokenAbi,
            provider
          );
          const dec = await tokenContract.decimals();
          setDecimals(dec);
        } else {
          setDecimals(18);
        }

        // Fetch vault metrics
        setVaultMetrics(prev => ({ ...prev, isLoading: true }));
        const [nftCount, totalFunds, yieldedFunds, nftPrice, joiningPeriod, claimingPeriod] = 
          await Promise.all([
            proxyContract.getNftCount(),
            proxyContract.totalFunds(),
            proxyContract.yieldedFunds(),
            proxyContract.nftPrice(),
            proxyContract.joiningPeriod(),
            proxyContract.claimingPeriod(),
          ]);

        const nftCountValue = Number(nftCount);
        setNftTotal(nftCountValue);
        
        const totalFundsValue = Number(totalFunds);
        const yieldedFundsValue = Number(yieldedFunds);
        const activenftPrice = Number(nftPrice);
        const dayLockin = Math.floor(
          (Number(claimingPeriod) - Number(joiningPeriod)) / 86400
        );

        setVaultMetrics({
          yieldValue: Math.max(0, yieldedFundsValue - totalFundsValue),
          lockingPeriod: dayLockin,
          backingPercentage: (yieldedFundsValue > 0 
            ? yieldedFundsValue / (nftCountValue * activenftPrice)
            : 1) * 100,
          isLoading: false,
        });

      } catch (err) {
        console.error('Error fetching vault metrics:', err);
        toast.error('Failed to fetch vault data', {
          description: err instanceof Error ? err.message : 'Unknown error occurred'
        });
        setVaultMetrics(prev => ({ ...prev, isLoading: false }));
      }
    };

    const fetchUserHoldings = async () => {
      if (!address || !walletProvider) {
        setHoldings({ tokenAmount: 0, nftAmount: 0, isLoading: false });
        return;
      }

      try {
        setHoldings(prev => ({ ...prev, isLoading: true }));
        const userProvider = new BrowserProvider(walletProvider, chainId);
        const userProxyContract = new Contract(
          vault.proxyAddress,
          vault.abi,
          userProvider
        );
        const result = await userProxyContract.vaults(address);
        setHoldings({
          tokenAmount: Number(result.ethAmount) || 0,
          nftAmount: Number(result.nftAmount) || 0,
          isLoading: false,
        });
      } catch (err) {
        console.error('Error fetching vault holdings:', err);
        setHoldings({ tokenAmount: 0, nftAmount: 0, isLoading: false });
      }
    };

    fetchVaultData();
    fetchUserHoldings();
  }, [vault.proxyAddress, address, walletProvider, chainId]);

  const formattedBalance = useMemo(() => {
    if (holdings.isLoading || vaultMetrics.isLoading || !nftTotal || !decimals) return '...';
    const totalValue = holdings.tokenAmount + vaultMetrics.yieldValue;
    return ethers.formatUnits((totalValue / nftTotal).toString(), decimals);
  }, [holdings, vaultMetrics, nftTotal, decimals]);

  const calculatedAPY = useMemo(() => {
    if (vaultMetrics.isLoading) return '...';
    return (8.8 + (vaultMetrics.backingPercentage - 100)).toFixed(4);
  }, [vaultMetrics]);

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
          shMON Vault: 0.2 MON x 10K NFTs
          <img width="20" src="/images/danceCat.webp" alt="coin" />
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 px-1 py-4">
        <div
          style={{
            background: vaultMetrics.isLoading 
              ? 'conic-gradient(#ccc 0% 100%)' 
              : `conic-gradient(#EC4444 0% ${vaultMetrics.backingPercentage}%, transparent ${vaultMetrics.backingPercentage}% 100%)`,
          }}
          className="relative aspect-square w-[96px] rounded-full"
        >
          <img
            className="absolute top-1/2 left-1/2 h-[90px] w-[90px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-white bg-white"
            src="/images/cfCard1.webp"
            alt={vault.title}
          />
          {vaultMetrics.isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            </div>
          )}
        </div>
        <img width={40} src="/images/blueBolt.webp" alt="bolt" />
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
          {formattedBalance}
        </span>
      </div>

      <div className="border-gunmetal bg-cream mx-6 flex justify-between rounded-full border-x-1 px-2 py-1 text-sm">
        <span>Net APY:</span>
        <span className="text-sienna font-bold">
          {calculatedAPY}%
        </span>
      </div>

      <div className="border-gunmetal bg-cream mx-6 flex justify-between rounded-full border-1 px-2 py-1 text-sm">
        <span>Lock-in Period:</span>
        <span className="text-sienna font-bold">
          {vaultMetrics.isLoading ? '...' : vaultMetrics.lockingPeriod}
        </span>
      </div>

      <VaultDialog index={index} />
    </div>
  );
}