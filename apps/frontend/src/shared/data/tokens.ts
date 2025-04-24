import address from './address';

export interface Itoken {
  symbol: string;
  img: string;
  address: string;
  decimals: number;
  isErc20: boolean;
}

export const shMonToken: Itoken = {
  symbol: 'shMON',
  img: '/images/monad.webp',
  address: address.shMon,
  isErc20: true,
  decimals: 18,
};

export const usdtToken: Itoken = {
  symbol: 'USDT',
  img: '/images/usdt.webp',
  address: address.usdt,
  isErc20: true,
  decimals: 6,
};

export const monToken: Itoken = {
  symbol: 'MON',
  img: '/images/monad.webp',
  address: address.shMon,
  isErc20: false,
  decimals: 18,
};

export const usdcToken: Itoken = {
  symbol: 'USDC',
  img: '/images/usdc.webp',
  address: address.usdc,
  isErc20: true,
  decimals: 6,
};

export const tokens: Itoken[] = [shMonToken, monToken, usdtToken, usdcToken];
