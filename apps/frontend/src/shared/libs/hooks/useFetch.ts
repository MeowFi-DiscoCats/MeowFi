import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { vaults } from '@/data/vaults';

import { formatEther } from 'ethers';
const formatE = (wei: bigint) => parseFloat(formatEther(wei));

const multicallAbi = [
  'function aggregate(tuple(address target, bytes callData)[] calls) public view returns (uint256 blockNumber, bytes[] returnData)',
];

const iface = new ethers.Interface([
  'function getNftCount() view returns (uint256)',
  'function totalFunds() view returns (uint256)',
  'function yieldedFunds() view returns (uint256)',
  'function claimingPeriod() external view returns (uint256)',
  'function joiningPeriod() external view returns (uint256)',
  'function prejoinPeriod() external view returns (uint256)',
  'function nftAddress() external view returns (address)',
]);

const provider = new ethers.JsonRpcProvider(import.meta.env.VITE_ALCHEMY_URL);
const multicall = new ethers.Contract(
  '0xcA11bde05977b3631167028862bE2a173976CA11',
  multicallAbi,
  provider
);
const functionNames = [
  'getNftCount',
  'totalFunds',
  'yieldedFunds',
  'claimingPeriod',
  'joiningPeriod',
  'prejoinPeriod',
  'nftAddress',
];

const fetchVaultData = async () => {
  const calls = vaults.flatMap((vault) =>
    functionNames.map((name) => ({
      target: vault.proxyAddress,
      callData: iface.encodeFunctionData(name),
    }))
  );

  const [, returnData] = await multicall.aggregate(calls);

  const vaultData = vaults.map((vault, index) => {
    const start = index * functionNames.length;
    const end = start + functionNames.length;
    const sliced = returnData.slice(start, end);

    const results = sliced.map(
      (data: string, i: number) =>
        iface.decodeFunctionResult(functionNames[i], data)[0]
    );

    const getNftCount = Number(results[0]);
    const totalFunds = formatE(results[1]);
    const yieldedFunds = formatE(results[2]);

    const principal = vault.nftPrice * getNftCount;
    const backingPercent = principal > 0 ? (totalFunds / principal) * 100 : 0;
    const yieldPercent = principal > 0 ? (yieldedFunds / principal) * 100 : 0;

    const weeklyYield = principal > 0 ? yieldedFunds / principal : 0;
    const apy = (1 + weeklyYield) ** 52 - 1;

    const round = (value: number, decimals: number = 2) =>
      Math.round(value * 10 ** decimals) / 10 ** decimals;

    const claimInPeriod =
      new Date(Number(results[3]) * 1000).toISOString().slice(0, 16) + 'Z';
    const joinInPeriod =
      new Date(Number(results[4]) * 1000).toISOString().slice(0, 16) + 'Z';

    const prejoinPeriod =
      new Date(Number(results[5]) * 1000).toISOString().slice(0, 16) + 'Z';

    const nftAddress = results[6];

    return {
      getNftCount,
      totalFunds,
      yieldedFunds,
      backingPercent: round(backingPercent),
      yieldPercent: round(yieldPercent),
      apy: round(apy * 100),
      claimInPeriod,
      joinInPeriod,
      prejoinPeriod,
      nftAddress,
    };
  });

  return vaultData;
};
export const useLiveFetch = () =>
  useQuery({
    queryKey: ['liveVaultsData'],
    queryFn: () => fetchVaultData(),
  });
