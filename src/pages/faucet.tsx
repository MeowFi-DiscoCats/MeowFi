import { tokenAbi, usdcContractAddress } from '@/lib/web3Config';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider, Contract, ethers } from 'ethers';
import  { useEffect, useState } from 'react';

function Faucet() {
  const [walletAddress, setWalletAddress] = useState('');
//   const [error, setError] = useState('');
  const [balance, setbalance] = useState(0);
  const [decimal, setdecimal] = useState(0);



  const { address, isConnected } = useAppKitAccount();
  const { walletProvider }: { walletProvider: any } =
    useAppKitProvider('eip155');

    useEffect(()=>{
        async function code() {
            if (address) {
                const ethersProvider = new BrowserProvider(walletProvider);
                const signer = await ethersProvider.getSigner();
  
                const tokencontract = new Contract(
                  usdcContractAddress,
                  tokenAbi,
                  signer
                );
                const decimals: BigInt = await tokencontract.decimals();
                console.log(decimals);
                setdecimal(Number(decimals))
                const bal = await tokencontract.balanceOf(
                  address
                );
                setbalance(bal)
                
              }
        }
        code()
    },[address,isConnected])

  

  return (
    <div className="m-16 flex h-screen items-start justify-center">
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-semibold">
          Your Usdc Balance:{balance!=0&&ethers.formatUnits(balance,decimal)  }
        </h2>
        <h2 className="mb-4 text-xl font-semibold">
          Enter Your Crypto Wallet Address
        </h2>

        <input
          type="text"
          className="w-full rounded-lg border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter wallet address"
          
          onChange={(e) =>{setWalletAddress(e.target.value)}}
        />
        {/* {error && <p className="mt-2 text-sm text-red-500">{error}</p>} */}
        <button
          onClick={async () => {
            if (isConnected) {
                const ethersProvider = new BrowserProvider(walletProvider);
                const signer = await ethersProvider.getSigner();
  
                const tokencontract = new Contract(
                  usdcContractAddress,
                  tokenAbi,
                  signer
                );
                const decimals: BigInt = await tokencontract.decimals();
                console.log(decimals);
  
                const tx = await tokencontract.mint(
                  walletAddress,
                  (200 * 10 ** Number(decimals)).toString()
                );
                const conf = await tx.wait();
                if (conf) {
                  alert(`200$ usdc Sent to ${walletAddress}`);
                } else {
                  alert(`error `);
                }
              }
          }}
          className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700"
        >
          Get 200 $ Usdc
        </button>
      </div>
    </div>
  );
}

export default Faucet;
