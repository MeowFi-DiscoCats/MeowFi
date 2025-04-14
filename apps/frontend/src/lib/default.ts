import { IErc20, IVault } from '../../../backend/src/models/IVault';
import { erc20NftTimeVaultCurvance, shMonadAbi } from './abi';
import { tokenAbi } from './abi.data';
import { curvancexFastLane, shMonadErc20Addr, usdcMonadErc20Addr, usdtMonadErc20Addr } from './address';

// const nativeTimeVaultFormData: IVault = {
//   title: 'Sumer Money',
//   img: 'https://plum-imaginative-guan-725.mypinata.cloud/ipfs/bafkreiaktn3yddbg444xfe5c43b5kh2r572xoddwenezk7cdccl45f4vfq',
//   lockedInPeriod: 10,
//   APR: 100,
//   type: 'flexible',
//   earnings: 0,
//   proxyAddress: nativetimelockVaultAddress,
//   tokenAddress: '0x24b3d12eb92304571e95A42B03d058d1e911aEAd',
//   AirdropIncentivised: 0,
//   totalSupply: 1000,
//   availableSupply: 0,
//   joinInPeriod: '2025-03-15T00:00',
//   claimInPeriod: '2025-03-17T00:00',
//   price: 1,
//   yieldValue: 0,
//   backingRatio: 1,
//   backingPercentage: 100,
//   tokenSymbol: 'MON',
//   NFTLimit: 10,
//   isErc20: false,
//   abi:nativeTimeVaultV2Abi,
//   tokenAbi:[]
// };
export const CurvanceAndFastlane: IVault = {
  title: 'Curvance x Fastlane',
  img: 'https://plum-imaginative-guan-725.mypinata.cloud/ipfs/bafkreifkhhgyhv5f3bhbegnoc3shbmjoo72ngvqntadgyi7wcq2rbiyuxi',
  lockedInPeriod: 30,
  APR: 225,
  type: 'flexible',
  earnings: 0,
  proxyAddress: curvancexFastLane,
  tokenAddress: shMonadErc20Addr,
  AirdropIncentivised: 0,
  totalSupply: 10000,
  availableSupply: 0,
  joinInPeriod: '2025-03-15T00:00',
  claimInPeriod: '2025-03-17T00:00',
  price: 0.2,
  yieldValue: 0,
  backingRatio: 1,
  backingPercentage: 100,
  tokenSymbol: 'shMON',
  NFTLimit: 1,
  isErc20: true,
  abi: erc20NftTimeVaultCurvance,
  tokenAbi: shMonadAbi,
  nftImage:'/images/hello.png'
};
// export const CurvanceAndFastlane2: IVault = {
//   //testing purpose
//   title: 'Curvance x Fastlane',
//   img: 'https://plum-imaginative-guan-725.mypinata.cloud/ipfs/bafkreifkhhgyhv5f3bhbegnoc3shbmjoo72ngvqntadgyi7wcq2rbiyuxi',
//   lockedInPeriod: 0,
//   APR: 225,
//   type: 'flexible',
//   earnings: 0,
//   proxyAddress: '0x5b52Aa26838A1A25Bea959f420b6C1cF2Da7C7f3',
//   tokenAddress: shMonadErc20Addr,
//   AirdropIncentivised: 0,
//   totalSupply: 10000,
//   availableSupply: 0,
//   joinInPeriod: '2025-03-15T00:00',
//   claimInPeriod: '2025-03-17T00:00',
//   price: 0.2,
//   yieldValue: 0,
//   backingRatio: 1,
//   backingPercentage: 100,
//   tokenSymbol: 'shMON',
//   NFTLimit: 1,
//   isErc20: true,
//   abi: erc20NftTimeVaultCurvance,
//   tokenAbi: shMonadAbi,
// };
export const shMon: IErc20 = {
  title: 'shMon',
  img: '/images/monad.webp',
  tokenAddress: shMonadErc20Addr,
  tokenAbi: tokenAbi,
};
export const usdt: IErc20 = {
  title: 'USDT',
  img: '/images/usdt.webp',
  tokenAddress: usdtMonadErc20Addr,
  tokenAbi: tokenAbi,
};
export const usdc: IErc20 = {
  title: 'USDC',
  img: '/images/usdc.webp',
  tokenAddress: usdcMonadErc20Addr,
  tokenAbi: tokenAbi,
};

export const dataArr: IVault[] = [CurvanceAndFastlane];
export const erc20Arr: IErc20[] = [shMon, usdt,usdc];
