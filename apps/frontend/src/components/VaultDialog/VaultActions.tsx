import { useState, useEffect } from 'react';
import { BrowserProvider, Contract, Eip1193Provider } from 'ethers';
import { useQueryClient } from '@tanstack/react-query';
import { IVault } from '../../../../backend/src/models/vault';
import {
  useAppKitAccount,
  useAppKitNetworkCore,
  useAppKitProvider,
} from '@reown/appkit/react';
import { tokenAbi, timeVaultV1Abi, NFTabi } from '@/lib/abi.data';
import {
  formatBalance,
  getTimeRemaining,
  formatCountdown,
} from '@/lib/VaultHelper';

export function VaultActions({ index }: { index: number }) {
  const queryClient = useQueryClient();
  const vaults: IVault[] = queryClient.getQueryData(['vaults'])!;
  const vault = vaults[index];

  const [quantity, setQuantity] = useState<number>(1);
  const [holdings, setHoldings] = useState<{
    tokenAmount: number;
    nftAmount: number;
  }>({
    tokenAmount: 0,
    nftAmount: 0,
  });

  const [joinTimeLeft, setJoinTimeLeft] = useState<string>('0d:0h:0m:0s');
  const [claimTimeLeft, setClaimTimeLeft] = useState<string>('0d:0h:0m:0s');

  const [userBalance, setUserBalance] = useState<string>('0');
  const [isBalanceLoading, setIsBalanceLoading] = useState<boolean>(false);

  const [depositLoading, setDepositLoading] = useState<boolean>(false);
  const [withdrawLoading] = useState<boolean>(false);
  const [claimLoading, setClaimLoading] = useState<boolean>(false);

  const [refresher, setRefresher] = useState<number>(0);

  const { isConnected, address } = useAppKitAccount();
  const { walletProvider }: { walletProvider: Eip1193Provider } =
    useAppKitProvider('eip155');
  const { chainId } = useAppKitNetworkCore();

  useEffect(() => {
    async function fetchBalance() {
      if (!address || !vault.tokenAddress || !walletProvider) return;

      setIsBalanceLoading(true);
      try {
        const provider = new BrowserProvider(walletProvider, chainId);
        const tokenContract = new Contract(
          vault.tokenAddress,
          tokenAbi,
          provider
        );
        const balance = await tokenContract.balanceOf(address);
        setUserBalance(balance.toString());
      } catch (error) {
        console.error('Error fetching token balance:', error);
        setUserBalance('0');
      } finally {
        setIsBalanceLoading(false);
      }
    }
    fetchBalance();
  }, [address, vault.tokenAddress, walletProvider, chainId, refresher]);

  useEffect(() => {
    async function fetchVaultHoldings() {
      if (!address || !vault.proxyAddress || !walletProvider) return;
      try {
        const provider = new BrowserProvider(walletProvider, chainId);
        const proxyContract = new Contract(
          vault.proxyAddress,
          timeVaultV1Abi,
          provider
        );
        const result = await proxyContract.vaults(address);
        setHoldings({
          tokenAmount: result.tokenAmount?.toNumber() || 0,
          nftAmount: result.nft?.toNumber() || 0,
        });
      } catch (error) {
        console.error('Error fetching vault holdings:', error);
        setHoldings({ tokenAmount: 0, nftAmount: 0 });
      }
    }
    fetchVaultHoldings();
  }, [address, vault.proxyAddress, walletProvider, chainId, refresher]);

  useEffect(() => {
    function updateCountdowns() {
      const joinRemaining = getTimeRemaining(vault.joinInPeriod);
      setJoinTimeLeft(formatCountdown(joinRemaining));

      const claimRemaining = getTimeRemaining(vault.claimInPeriod);
      setClaimTimeLeft(formatCountdown(claimRemaining));
    }

    updateCountdowns();
    const intervalId = setInterval(updateCountdowns, 1000);
    return () => clearInterval(intervalId);
  }, [vault.joinInPeriod, vault.claimInPeriod]);

  async function handleDeposit() {
    if (!isConnected) {
      alert('Please connect your wallet.');
      return;
    }
    setDepositLoading(true);
    try {
      const provider = new BrowserProvider(walletProvider, chainId);
      const signer = await provider.getSigner();
      const proxyContract = new Contract(
        vault.proxyAddress,
        timeVaultV1Abi,
        signer
      );
      const tokenContract = new Contract(vault.tokenAddress, tokenAbi, signer);

      const approveTx = await tokenContract.approve(
        vault.proxyAddress,
        (quantity * Number(vault.price)).toString()
      );
      await approveTx.wait();

      const depositTx = await proxyContract.joinVault(quantity);
      const receipt = await depositTx.wait();
      if (receipt) {
        alert('Deposit successful.');
        setRefresher((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Error during deposit:', error);
      alert('Deposit failed. Please try again.');
    } finally {
      setDepositLoading(false);
    }
  }

  async function handleWithdraw() {
    // contract don't have withdraw function
  }

  async function handleClaim() {
    if (claimTimeLeft !== '0d:0h:0m:0s') {
      alert('Claim period has not started yet.');
      return;
    }
    if (!isConnected) {
      alert('Please connect your wallet.');
      return;
    }
    setClaimLoading(true);
    try {
      const provider = new BrowserProvider(walletProvider, chainId);
      const signer = await provider.getSigner();
      const proxyContract = new Contract(
        vault.proxyAddress,
        timeVaultV1Abi,
        signer
      );

      const nftContract = new Contract(vault.NFTAddress, NFTabi, signer);

      const tx2 = await nftContract.setApprovalForAll(vault.proxyAddress, true);
      const conf2 = await tx2.wait();
      if (conf2) {
        const claimTx = await proxyContract.claimBack();
        const receipt = await claimTx.wait();
        if (receipt) {
          alert('Claim successful.');
        }
      }
      setRefresher((prev) => prev + 1);
    } catch (error) {
      console.error('Error during claim:', error);
      alert('Claim failed. Please try again.');
    } finally {
      setClaimLoading(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-3">
      <p className="text-center font-semibold">
        {joinTimeLeft === '0d:0h:0m:0s'
          ? 'Vault Closed'
          : `Vault Closes In: ${joinTimeLeft}`}
      </p>
      <div className="border-gunmetal flex items-center justify-between gap-2 rounded-xl border bg-white p-2">
        <div className="flex items-center gap-2">
          <img
            width="30"
            className="p-[1px] shadow"
            src="/images/danceCat.webp"
            alt="NFTs"
          />
          <div>
            <p>Vault Info</p>
            <p className="font-Teko text-xl font-semibold tracking-wider">
              {vault.totalSupply} @ ${vault.price} in {vault.tokenSymbol}
            </p>
          </div>
        </div>
        <img width="30" src="/images/lightingBolt.webp" alt="points" />
      </div>
      <div className="border-gunmetal bg-yellow flex justify-between rounded-lg border p-2 font-semibold">
        <span>Vault Supply:</span>
        <span className="font-Teko tracking-wider">
          {vault.availableSupply}/{vault.totalSupply}
        </span>
      </div>
      <div className="border-gunmetal flex justify-between rounded-lg border bg-white p-1">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-2"
          disabled={quantity <= 1}
        >
          -
        </button>
        <div>{quantity}</div>
        <button
          onClick={() => setQuantity(Math.min(vault.NFTLimit, quantity + 1))}
          className="px-2"
          disabled={quantity >= vault.availableSupply}
        >
          +
        </button>
      </div>
      <p className="-my-3 text-end text-sm">
        Balance:{' '}
        {isBalanceLoading
          ? 'Loading...'
          : `${formatBalance(userBalance)} ${vault.tokenSymbol}`}
      </p>
      <div className="flex gap-2">
        <button
          onClick={handleDeposit}
          className="hover:bg-amber/90 border-gunmetal bg-amber flex-1 rounded-lg border p-1 text-center font-semibold disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-100 disabled:text-gray-400"
          disabled={joinTimeLeft === '0d:0h:0m:0s' || depositLoading}
        >
          {depositLoading ? 'Depositing...' : 'Deposit'}
        </button>
        <button
          onClick={handleWithdraw}
          className="flex-1 rounded-lg border border-gray-400 p-1 text-center font-semibold text-gray-400 hover:bg-gray-100"
          disabled={withdrawLoading}
        >
          {withdrawLoading ? 'Withdrawing...' : 'Withdraw'}
        </button>
      </div>
      <div className="border-gunmetal flex flex-col overflow-hidden rounded-lg border">
        <div className="flex">
          <div className="border-gunmetal flex-1 border-r border-b p-1 text-center">
            Holdings
          </div>
          <div className="border-gunmetal flex-1 border-b p-1 text-center">
            Amount
          </div>
        </div>
        <div className="flex">
          <div className="border-gunmetal flex-1 border-r border-b p-1 text-center">
            {holdings.nftAmount} NFTs
          </div>
          <div className="border-gunmetal flex-1 border-b p-1 text-center">
            {holdings.tokenAmount} {vault.tokenSymbol}
          </div>
        </div>
        <div className="bg-cream flex items-center justify-center gap-2 p-2 text-xs">
          <img width="20" height="20" src="/images/info.webp" alt="info" />
          You will be able to claim your initial funds along with the yield
          generated after the lock-up period.
        </div>
        <button
          onClick={handleClaim}
          className="bg-amber p-1"
          disabled={claimLoading}
        >
          {claimTimeLeft === '0d:0h:0m:0s'
            ? 'Claim'
            : claimLoading
              ? 'Claiming...'
              : `Claim Opens in: ${
                  vault.claimInPeriod.includes('T')
                    ? claimTimeLeft
                    : vault.claimInPeriod
                }`}
        </button>
      </div>
    </div>
  );
}
