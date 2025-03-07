import { VaultData } from '@/lib/data';
import { alchemyUrl, nftAbi, timeVaultV1Abi, tokenAbi } from '@/lib/web3Config';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider, Contract, ethers } from 'ethers';
import { useEffect, useState } from 'react';

interface VaultActionsProps {
  vaultData: VaultData;
  quantity: number;
  setQuantity: (value: number) => void;
  isDepositing: boolean;
  setIsDepositing: (value: boolean) => void;
}

export function VaultActions({
  vaultData,
  quantity,
  setQuantity,
  isDepositing,
  setIsDepositing,
}: VaultActionsProps) {
  const { isConnected } = useAppKitAccount();
  const { walletProvider }: { walletProvider: any } =
    useAppKitProvider('eip155');
  const [epoch, setEpoch] = useState(0);
  const [state, setstate] = useState(0);

  useEffect(() => {
    async function code() {
      // if (isConnected) {
      // const ethersProvider = new BrowserProvider(walletProvider);
      // const signer = await ethersProvider.getSigner();
      const provider = new ethers.JsonRpcProvider(alchemyUrl);
      const proxycontract = new Contract(
        vaultData.proxyaddress,
        timeVaultV1Abi,
        provider
      );

      const unixTime = Math.floor(Date.now() / 1000);
      const _state = await proxycontract.getState();
      if (_state == 0) {
        console.log(Number(vaultData.vaultClosesIn) - unixTime);
        console.log((Number(vaultData.vaultClosesIn) - unixTime) / 86400);
      }
      setEpoch(unixTime);
      setstate(_state);
      console.log(_state);
      // }
    }
    code();
  });
  return (
    <div className="flex flex-1 flex-col gap-3">
      {state == 0 && epoch != 0 && (
        <p className="text-center font-semibold">
          Vault Closes In:{' '}
          {Math.floor((Number(vaultData.vaultClosesIn) - epoch) / 86400)} Days{' '}
          {Math.floor(
            ((Number(vaultData.vaultClosesIn) - epoch) % 86400) / 3600
          )}{' '}
          Hours{' '}
          {Math.floor(((Number(vaultData.vaultClosesIn) - epoch) % 3600) / 60)}{' '}
          Mins
        </p>
      )}
      {/* {state == 2 && (
        <p className="text-center font-semibold">Yielded Funds:{vaultData.yieldGenerated} </p>
      )} */}
      <div className="border-gunmetal flex items-center justify-between gap-2 rounded-xl border bg-white p-2">
        <div className="flex items-center gap-2">
          <img
            width="30px"
            className="p-[1px] shadow"
            src="/images/danceCat.webp"
            alt="NFTs"
          />
          <div>
            <p>Vault Info</p>
            <p className="font-Teko text-xl font-semibold tracking-wider">
              {vaultData.vaultInfo.amount}@ $
              {ethers.formatUnits(vaultData.vaultInfo.pricePerUnit, 18)} in{' '}
              {vaultData.vaultInfo.currency}
            </p>
          </div>
        </div>
        <img width="30px" src="/images/lightingBolt.webp" alt="points" />
      </div>
      <div className="border-gunmetal bg-yellow flex justify-between rounded-lg border p-2 font-semibold">
        <span>Vault Supply:</span>
        <span className="font-Teko tracking-wider">
          {ethers.formatUnits(vaultData.vaultSupply.current, 0)}/
          {vaultData.vaultInfo.amount}
        </span>
      </div>
      {state == 0 && epoch != 0 && (
        <p className="text-center text-sm text-red-500 select-none">
          Nft Cap per Address:{vaultData.vaultInfo.nftLimitPerAddress}
        </p>
      )}
      <div className="border-gunmetal flex justify-between rounded-lg border bg-white p-1">
        <button onClick={() => setQuantity(quantity - 1)} className="px-2">
          -
        </button>
        <div>{quantity}</div>
        <button onClick={() => setQuantity(quantity + 1)} className="px-2">
          +
        </button>
      </div>

      <p className="-my-3 text-end text-sm">
        Balance: {ethers.formatUnits(vaultData.balance, 18)}
      </p>
      <div className="border-gunmetal flex gap-2 rounded-lg border p-1">
        <button
          onClick={() => setIsDepositing(true)}
          className={`flex-1 rounded-lg p-1 text-center font-semibold ${
            isDepositing ? 'border-gunmetal bg-amber border' : 'bg-white'
          }`}
        >
          Deposit
        </button>
        <button
          onClick={() => setIsDepositing(false)}
          className={`flex-1 rounded-lg p-1 text-center font-semibold ${
            isDepositing ? 'bg-white' : 'border-gunmetal bg-amber border'
          }`}
        >
          Withdraw
        </button>
      </div>
      <div className="border-gunmetal flex flex-col overflow-hidden rounded-lg border">
        <div className="flex">
          <div className="border-gunmetal flex-1 border-r border-b p-1 text-center">
            Position
          </div>
          <div className="border-gunmetal flex-1 border-b p-1 text-center">
            Amount
          </div>
        </div>
        <div className="flex">
          <div className="border-gunmetal flex-1 border-r border-b p-1 text-center">
            Name of NFT
          </div>
          <div className="border-gunmetal flex-1 border-b p-1 text-center">
            no. of NFTs
          </div>
        </div>
        <div className="bg-cream flex items-center justify-center gap-2 p-2 text-xs">
          <img width="20px" height="20px" src="/images/info.webp" />
          You will be able to claim your initial funds along with the yield
          generated after the lock-up period.
        </div>
        {state == 0 ? (
          <button
            onClick={async () => {
              if (isConnected) {
                const ethersProvider = new BrowserProvider(walletProvider);
                const signer = await ethersProvider.getSigner();

                const proxycontract = new Contract(
                  vaultData.proxyaddress,
                  timeVaultV1Abi,
                  signer
                );
                const tokencontract = new Contract(
                  vaultData.tokenAddress,
                  tokenAbi,
                  signer
                );
                if (vaultData.vaultInfo.nftLimitPerAddress < quantity) {
                  alert('max cap reached');
                } else {
                  const tx = await tokencontract.approve(
                    proxycontract,
                    (
                      quantity * Number(vaultData.vaultInfo.pricePerUnit)
                    ).toString()
                  );
                  const conf = await tx.wait();
                  if (conf) {
                    const tx2 = await proxycontract.joinVault(quantity);
                    const conf2 = await tx2.wait();
                    if (conf2) {
                      alert('vault purchased');
                    }
                  }
                }
              }
            }}
            className="bg-amber my-1 p-1"
          >
            Deposit
          </button>
        ) : (
          <div className="bg-amber my-1 flex justify-center p-1">
            Joining period Over{' '}
          </div>
        )}
        {state != 2 ? (
          <div className="bg-amber flex justify-center p-1">
            Claim Opens in:{' '}
            {Math.floor((Number(vaultData.claimOpensIn) - epoch) / 86400)} Days{' '}
            {Math.floor(
              ((Number(vaultData.claimOpensIn) - epoch) % 86400) / 3600
            )}{' '}
            Hours{' '}
            {Math.floor(((Number(vaultData.claimOpensIn) - epoch) % 3600) / 60)}{' '}
            Mins
          </div>
        ) : (
          <button
            onClick={async () => {
              if (isConnected) {
                const ethersProvider = new BrowserProvider(walletProvider);
                const signer = await ethersProvider.getSigner();

                const proxycontract = new Contract(
                  vaultData.proxyaddress,
                  timeVaultV1Abi,
                  signer
                );
                const nftContract = new Contract(
                  vaultData.nftAddress,
                  nftAbi,
                  signer
                );

                const tx2 = await nftContract.setApprovalForAll(
                  vaultData.proxyaddress,
                  true
                );
                const conf2 = await tx2.wait();
                if (conf2) {
                  const tx = await proxycontract.claimBack();
                  const conf = await tx.wait();
                  if (conf) {
                    alert('funds withdrawn');
                  }
                }
              }
            }}
            className="bg-amber p-1"
          >
            Claim Your Funds
          </button>
        )}
      </div>
    </div>
  );
}
