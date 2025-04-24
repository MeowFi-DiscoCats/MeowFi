import { useQuery } from '@tanstack/react-query';
import { BrowserProvider, Eip1193Provider, ethers } from 'ethers';
import { vaults } from '@/data/vaults';

const multicallAbi = [
  'function aggregate(tuple(address target, bytes callData)[] calls) public view returns (uint256 blockNumber, bytes[] returnData)',
];

const iface = new ethers.Interface([
  'function balanceOf(address) view returns (uint256)',
  'function getBalanceNft(address) public view returns (uint256 ethAmount, uint256 nftAmount)',
]);

const fetchVaultData = async (
  walletProvider: Eip1193Provider,
  chainId: string,
  index: number
) => {
  const provider = new BrowserProvider(walletProvider, chainId);
  const vault = vaults[index];
  const signer = await provider.getSigner();
  const userAddress = await signer.getAddress();

  const calls = [
    {
      target: vault.token.address,
      callData: iface.encodeFunctionData('balanceOf', [userAddress]),
    },
    {
      target: vault.proxyAddress,
      callData: iface.encodeFunctionData('getBalanceNft', [userAddress]),
    },
  ];

  const multicall = new ethers.Contract(
    '0xcA11bde05977b3631167028862bE2a173976CA11',
    multicallAbi,
    provider
  );

  const [, returnData] = await multicall.aggregate(calls);
  const [balance] = iface.decodeFunctionResult('balanceOf', returnData[0]);
  const v = iface.decodeFunctionResult('getBalanceNft', returnData[1]);
  console.log(returnData[1])

  return {
    balance: (Number(balance) / 10 ** vault.token.decimals).toFixed(3),
    tokenAmount: Number(v.ethAmount),
    nftAmount: Number(v.nftAmount),
  };
};

export const useUserLiveFetch = (
  walletProvider: Eip1193Provider,
  chainId: string,
  index: number,
  isConnected: boolean
) =>
  useQuery({
    queryKey: ['liveUserVaultsData', index],
    queryFn: () => fetchVaultData(walletProvider, chainId, index),
    enabled: isConnected,
  });
