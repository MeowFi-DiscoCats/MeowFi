// import abi from './abi';
import address from './address';
import { Itoken, shMonToken } from './tokens';

export interface IVault {
  title: string;
  img: string;
  lockedInPeriod: number;
  apy: number;
  type: 'fixed' | 'flexible';
  proxyAddress: string;
  airdropIncentivised: number;
  totalSupply: number;
  availableSupply: number;
  joinInPeriod: string;
  claimInPeriod: string;
  nftPrice: number;
  backingRatio: number;
  backingPercentage: number;
  nftLimit: number;
  // abi: ethers.Interface | ethers.InterfaceAbi;
  nftImage: string;
  token: Itoken;
}

// const _nativeTimeVault: IVault = {
//   title: 'Sumer Money',
//   img: '/images/whiteCard.webp',
//   lockedInPeriod: 10,
//   apy: 20,
//   type: 'flexible',
//   proxyAddress: address.nativetimelockVault,
//   airdropIncentivised: 0,
//   totalSupply: 1000,
//   availableSupply: 0,
//   joinInPeriod: '2025-03-15T00:00',
//   claimInPeriod: '2025-03-17T00:00',
//   nftPrice: 1,
//   backingRatio: 1,
//   backingPercentage: 100,
//   nftImage: '/images/sumerNft.webp',
//   token: monToken,
//   nftLimit: 10,
//   // abi: abi.proxy,
// };
//
const curvanceFastlaneVault: IVault = {
  title: 'Curvance x Fastlane',
  img: '/images/cfCard1.webp',
  lockedInPeriod: 30,
  type: 'flexible',
  apy: 10,
  proxyAddress: address.curvanceFastlane,
  airdropIncentivised: 0,
  totalSupply: 10000,
  availableSupply: 0,
  joinInPeriod: '2025-03-15T00:00Z',
  claimInPeriod: '2025-03-17T00:00Z',
  nftPrice: 0.2,
  backingRatio: 1,
  backingPercentage: 100,
  nftLimit: 1,
  // abi: abi.curvanceXFastlane,
  nftImage: '/images/cfNFT.webp',
  token: shMonToken,
};

const CurvanceAndFastlane2: IVault = {
  //testing purpose
  title: 'Curvance x Fastlane2',
  img: '/images/cfCard2.webp',
  lockedInPeriod: 0,
  apy: 225,
  type: 'flexible',
  proxyAddress: '0xD2258Eaa6f2679cE03fc998a42B6E33A6F007AF9',
  airdropIncentivised: 0,
  totalSupply: 1000,
  availableSupply: 0,
  joinInPeriod: '2025-03-15T00:00Z',
  claimInPeriod: '2025-03-17T00:00Z',
  nftPrice: 0.1,
  backingRatio: 1,
  backingPercentage: 100,
  nftLimit: 10,
  nftImage: '/images/cfNFT.webp',
  token: shMonToken,
};

export const vaults: IVault[] = [curvanceFastlaneVault, CurvanceAndFastlane2];
