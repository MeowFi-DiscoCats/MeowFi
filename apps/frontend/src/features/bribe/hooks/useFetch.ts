import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { vaults } from '@/data/vaults';
import { tokens, Itoken } from '@/data/tokens';

const multicallAbi = [
  'function aggregate(tuple(address target, bytes callData)[] calls) public view returns (uint256 blockNumber, bytes[] returnData)',
];

const iface = new ethers.Interface([
  'function bribeCount() external view returns (uint256)',
  'function bribes(address) external view returns (uint256)',
]);

const provider = new ethers.JsonRpcProvider(import.meta.env.VITE_ALCHEMY_URL);
const multicall = new ethers.Contract(
  '0xcA11bde05977b3631167028862bE2a173976CA11',
  multicallAbi,
  provider
);

const fetchBribeData = async (index: number) => {
  const vault = vaults[index];

  const calls = [
    {
      target: vault.proxyAddress,
      callData: iface.encodeFunctionData('bribeCount', []),
    },
    ...tokens.map((token: Itoken) => ({
      target: vault.proxyAddress,
      callData: iface.encodeFunctionData('bribes', [token.address]),
    })),
  ];

  const [, returnData] = await multicall.aggregate(calls);

  const bribeCount = iface.decodeFunctionResult('bribeCount', returnData[0]);

  const bribes = tokens.map((token, i) => {
    const amount = iface.decodeFunctionResult('bribes', returnData[i + 1]);

    return {
      ...token,
      amount: (Number(amount) / 10 ** token.decimals).toFixed(3),
    };
  });

  return { bribeCount: Number(bribeCount), bribes };
};

export const useBribeFetch = (index: number) =>
  useQuery({
    queryKey: ['trackBribe', index],
    queryFn: () => fetchBribeData(index),
    refetchInterval: 10000,
  });
