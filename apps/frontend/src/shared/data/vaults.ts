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
  prejoinPeriod: string;
  // abi: ethers.Interface | ethers.InterfaceAbi;
  nftImage: string;
  nftAddress: string;
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
//   prejoinPeriod: '2025-03-15T00:00',
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
  lockedInPeriod: 60,
  type: 'flexible',
  apy: 10,
  proxyAddress: address.curvanceFastlane,
  airdropIncentivised: 0,
  totalSupply: 10000,
  availableSupply: 0,
  joinInPeriod: '2025-05-02T17:00Z',
  claimInPeriod: '2025-07-02T17:00Z',
  prejoinPeriod: '2025-04-25T17:00Z',
  nftPrice: 50,
  backingRatio: 1,
  backingPercentage: 100,
  nftLimit: 3,
  // abi: abi.curvanceXFastlane,
  nftImage: '/images/cfNFT2.webp',
  nftAddress: '0x34AF03074B7F72CFd1B1b0226d088A1E28c7405D',
  token: shMonToken,
};

// const CurvanceAndFastlane2: IVault = {
//   //testing purpose
//   title: 'Curvance x Fastlane2',
//   img: '/images/cfCard2.webp',
//   lockedInPeriod: 0,
//   apy: 225,
//   type: 'flexible',
//   proxyAddress: '0x28010E7cf1d522B75dF375A0caFe7eC681ADc3D5',
//   airdropIncentivised: 0,
//   totalSupply: 1000,
//   availableSupply: 0,
//   joinInPeriod: '2025-03-15T00:00Z',
//   claimInPeriod: '2025-03-17T00:00Z',
//   prejoinPeriod: '2025-03-14T00:00Z',
//   nftPrice: 0.1,
//   backingRatio: 1,
//   backingPercentage: 100,
//   nftLimit: 10,
//   nftImage: '/images/cfNFT2.webp',
//   nftAddress: '0x24F6e209205401096f2DD59Dca1e3F75D76E70C3',
//   token: shMonToken,
// };

export const vaults: IVault[] = [curvanceFastlaneVault];
