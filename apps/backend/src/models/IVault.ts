export interface IVault {
  title: string;
  img: string;
  lockedInPeriod: number;
  APR: number;
  type: "fixed" | "flexible";
  earnings: number;
  proxyAddress: string;
  tokenAddress: string;
  AirdropIncentivised: number;
  totalSupply: number;
  availableSupply: number;
  joinInPeriod: string;
  claimInPeriod: string;
  price: number;
  yieldValue: number;
  backingRatio: number;
  backingPercentage: number;
  tokenSymbol: string;
  NFTLimit: number;
  isErc20: boolean;
  abi: any[];
  tokenAbi: any[];
  nftImage: string;
}
