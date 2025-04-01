import { IVault } from "../../../backend/src/models/IVault"
import { nativetimelockVaultAddress } from "./address"


const nativeTimeVaultFormData:IVault={
    "title": "Summer",
    "img": "https://obya3wwefi.ufs.sh/f/vL3P6gZND4Zg8cg59VzOljbcUGV94dZ2muCXf0ogyNBQn1AR",
    "lockedInPeriod": 10,
    "APR": 100,
    "type": "fixed",
    "earnings": 0,
    "proxyAddress":nativetimelockVaultAddress ,
    "tokenAddress": "0x24b3d12eb92304571e95A42B03d058d1e911aEAd",
    "AirdropIncentivised": 0,
    "totalSupply": 1000,
    "availableSupply": 0,
    "joinInPeriod": "2025-03-15T00:00",
    "claimInPeriod": "2025-03-17T00:00",
    "price": 1,
    "yieldValue": 0,
    "backingRatio": 1,
    "backingPercentage": 100,
    "tokenSymbol": "MON",
    "NFTLimit": 10,
    "isErc20":false
    
}
export const dataArr:IVault[]=[nativeTimeVaultFormData]