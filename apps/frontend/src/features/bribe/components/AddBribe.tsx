import { useCallback, useEffect, useState } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AiFillInfoCircle } from 'react-icons/ai';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { vaults } from '@/data/vaults';
import { tokens } from '@/data/tokens';
import DepositBribeDialog from './DepositBribeDialog';
import {
  useAppKitAccount,
  useAppKitNetworkCore,
  useAppKitProvider,
} from '@reown/appkit/react';
import { BrowserProvider, Contract, Eip1193Provider, ethers } from 'ethers';

export default function AddBribe() {
  const [selectedVaultIndex, setSelectedVaultIndex] = useState(0);
  const [selectedTokenIndex, setSelectedTokenIndex] = useState(0);
  const [amount, setAmount] = useState(100);
  const [refresh, setRefresh] = useState(false);

  const [userBalance, setUserBalance] = useState<number>(0);
  const [bribeInfo, setBribeInfo] = useState<number>(0);

  const vault = vaults[selectedVaultIndex];
  const token = tokens[selectedTokenIndex];

  const { isConnected, address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155') as {
    walletProvider: Eip1193Provider;
  };
  const { chainId } = useAppKitNetworkCore();

  // Fetch existing bribe info for this user/token
  const fetchBribeInfo = useCallback(async () => {
    const vault = vaults[selectedVaultIndex];
    if (!address || !walletProvider) return;
    try {
      const provider = new BrowserProvider(walletProvider, chainId);
      const proxyContract = new Contract(
        vault.proxyAddress,
        ['function briber(address, address) view returns (uint256)'],
        provider
      );
      const info = await proxyContract.briber(address, token.address);

      setBribeInfo(Number(ethers.formatUnits(info, token.decimals)));
    } catch (err) {
      console.error('Error fetching bribe info:', err);
    }
  }, [
    address,
    walletProvider,
    chainId,
    token.address,
    token.decimals,
    selectedVaultIndex,
  ]);

  const fetchBalance = useCallback(async () => {
    const token = tokens[selectedTokenIndex];
    if (!address || !walletProvider) return;
    try {
      const provider = new BrowserProvider(walletProvider, chainId);
      const tokenContract = new Contract(
        token.address,
        ['function balanceOf(address) view returns (uint256)'],
        provider
      );
      const bal = await tokenContract.balanceOf(address);

      setUserBalance(Number((Number(bal) / 10 ** token.decimals).toFixed(3)));
    } catch (err) {
      console.error('Error fetching balance:', err);
    }
  }, [address, selectedTokenIndex, walletProvider, chainId]);

  useEffect(() => {
    if (!isConnected) return;
    fetchBribeInfo();
    fetchBalance();
  }, [
    isConnected,
    selectedVaultIndex,
    selectedTokenIndex,
    fetchBribeInfo,
    fetchBalance,
    refresh,
  ]);

  return (
    <TabsContent
      value="add"
      className="flex min-h-[300px] w-full flex-col p-4 px-8 max-sm:px-3"
    >
      <p className="font-Teko mb-2 flex items-center gap-2 leading-relaxed font-semibold">
        Select Vault to Bribe
        <HoverCard>
          <HoverCardTrigger asChild>
            <button
              type="button"
              aria-label="Information"
              className="-translate-y-0.5"
            >
              <AiFillInfoCircle className="text-amber" />
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="bg-yellow border-gunmetal w-[250px] rounded-xl border">
            <p className="text-center">
              Adding bribes to the vault can attract more liquidity providers.
              Anyone can contribute bribes, though it’s usually done by
              projects.
            </p>
          </HoverCardContent>
        </HoverCard>
      </p>

      <Select
        onValueChange={(val) => setSelectedVaultIndex(Number(val))}
        defaultValue={`${selectedVaultIndex}`}
      >
        <SelectTrigger className="[&_*]:font-Teko border-gunmetal !font-Teko [&_*]leading-loose w-full font-semibold shadow-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bordrer-2 border-gunmetal">
          {vaults.map((v, idx) => (
            <SelectItem
              className="[&_*]:font-Teko font-semibold"
              key={v.proxyAddress}
              value={`${idx}`}
            >
              <img
                src={v.img}
                alt="vault logo"
                className="mr-2 inline-block h-6 w-6 rounded-full"
              />
              {v.title} - {v.token.symbol} Vault
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="bg-yellow border-gunmetal mt-4 flex justify-around rounded-xl border p-2">
        <div className="flex flex-col items-center">
          <span className="text-sm">Vault liquidity</span>
          <span className="font-Teko font-semibold">
            {vault.nftPrice * vault.totalSupply} {vault.token.symbol}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm">Bribe Lock</span>
          <span className="font-Teko font-semibold">
            {vault.lockedInPeriod} Days
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm">You Bribed</span>
          <span className="font-Teko font-semibold">
            {bribeInfo} {token.symbol}
          </span>
        </div>
      </div>

      <p className="font-Teko mt-4 mb-2 flex items-center gap-2 leading-relaxed font-semibold">
        Select token to bribe
      </p>
      <div className="border-gunmetal flex gap-1 rounded-xl border bg-white p-1 px-2">
        <input
          placeholder="Amount"
          type="number"
          defaultValue={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="bg-yellow border-gunmetal flex-1 rounded-xl border p-2 py-1"
        />
        <div className="flex flex-1 justify-end">
          <Select
            onValueChange={(val) => setSelectedTokenIndex(Number(val))}
            defaultValue={`${selectedTokenIndex}`}
          >
            <SelectTrigger className="[&_*]:font-Teko !font-Teko [&_*]leading-loose w-28 border-none font-semibold shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bordrer-2 border-gunmetal flex-1">
              {tokens.map((t, idx) => (
                <SelectItem
                  className="[&_*]:font-Teko font-semibold"
                  key={t.symbol}
                  value={`${idx}`}
                >
                  <img
                    src={t.img}
                    alt="token logo"
                    className="mr-2 inline-block h-6 w-6 rounded-full"
                  />
                  {t.symbol}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="pr-2 text-end text-sm">
        <strong>Balance :</strong>
        <span className="mx-1"> {userBalance}</span>
        <span>{token.symbol}</span>
      </div>

      <DepositBribeDialog
        amount={amount}
        selectedVaultIndex={selectedVaultIndex}
        selectedTokenIndex={selectedTokenIndex}
        userBalance={userBalance}
        setRefresh={setRefresh}
      />
    </TabsContent>
  );
}
