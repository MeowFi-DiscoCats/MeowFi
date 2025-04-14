import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  Dialog,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { dataArr, erc20Arr } from '@/lib/default';
import { AiFillInfoCircle } from 'react-icons/ai';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Button } from './ui/button';
import {
  useAppKitAccount,
  useAppKitNetworkCore,
  useAppKitProvider,
} from '@reown/appkit/react';
import { BrowserProvider, Contract, Eip1193Provider, ethers } from 'ethers';
import { formatBalance } from '@/lib/VaultHelper';
import { toast } from 'sonner';
import { IVault } from '../../../backend/src/models/IVault';
import { tokenAbi } from '@/lib/abi.data';

export default function Bribe() {
  const [erc20Index, setErc20Index] = useState(0);
  const [erc20TokenBalance, setErc20TokenBalance] = useState<number[]>([]);
  const [erc20Decimal, setErc20Decimal] = useState<number[]>([]);
  const [selectedVaultIndex, setSelectedVaultIndex] = useState(0);
  const [selectedVault, setSelectedVault] = useState<IVault>();
  const [amnt, setAmnt] = useState(500);
  const [userBalance, setUserBalance] = useState(0);
  const [decimals, setDecimals] = useState(0);
  const [bribe, setBribe] = useState(0);

  const { isConnected, address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155') as { walletProvider: Eip1193Provider };
  const { chainId } = useAppKitNetworkCore();

  // Memoize frequently used values
  const currentErc20 = useMemo(() => erc20Arr[erc20Index], [erc20Index]);
  const currentVault = useMemo(() => dataArr[selectedVaultIndex], [selectedVaultIndex]);

  // Fetch bribe info
  const fetchBribeInfo = useCallback(async () => {
    if (!address || !walletProvider) return;

    try {
      const provider = new BrowserProvider(walletProvider, chainId);
      const proxyContract = new Contract(
        currentVault.proxyAddress,
        currentVault.abi,
        provider
      );
      const tokenContract = new Contract(
        currentVault.tokenAddress,
        currentVault.tokenAbi,
        provider
      );
      const decimal_ = await tokenContract.decimals();
      setDecimals(decimal_);
      const bribeInfo_ = await proxyContract.briber(address, currentErc20.tokenAddress);
      setBribe(bribeInfo_);
    } catch (error) {
      console.error('Error fetching bribe info:', error);
    }
  }, [address, walletProvider, chainId, currentVault, currentErc20.tokenAddress,erc20Index,selectedVaultIndex]);

  // Fetch user balance
  const fetchBalance = useCallback(async () => {
    if (!address || !walletProvider) return;

    try {
      const provider = new BrowserProvider(walletProvider, chainId);
      const tokenContract = new Contract(
        currentErc20.tokenAddress,
        currentErc20.tokenAbi,
        provider
      );
      const decimal_ = await tokenContract.decimals();
      setDecimals(decimal_);
      const balance_ = await tokenContract.balanceOf(address);
      setUserBalance(Number(balance_));
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  }, [address, walletProvider, chainId, currentErc20,erc20Index,selectedVaultIndex]);

  // Fetch token balances
  const fetchTokenBalance = useCallback(async () => {
    if (!isConnected) {
      toast('Please connect your wallet.');
      return;
    }

    try {
      const provider = new BrowserProvider(walletProvider, chainId);
      const signer = await provider.getSigner();
      const proxyContract = new Contract(
        currentVault.proxyAddress,
        currentVault.abi,
        signer
      );

      const balancePromises = erc20Arr.map(async (i) => {
        const bal = await proxyContract.bribes(i.tokenAddress);
        return bal ? Number(bal) : 0;
      });

      const decimalPromises = erc20Arr.map(async (i) => {
        const tokenContract = new Contract(i.tokenAddress, tokenAbi, signer);
        return await tokenContract.decimals();
      });

      const [balances, decimals] = await Promise.all([
        Promise.all(balancePromises),
        Promise.all(decimalPromises)
      ]);

      setErc20TokenBalance(balances);
      setErc20Decimal(decimals);
    } catch (error) {
      console.error('Error fetching token balances:', error);
    }
  }, [isConnected, walletProvider, chainId, currentVault]);

  // Combined effect for data that needs to refresh when vault or token changes
  useEffect(() => {
    setSelectedVault(currentVault);
    const fetchData = async () => {
      await Promise.all([
        fetchBribeInfo(),
        fetchBalance(),
        fetchTokenBalance()
      ]);
    };
    fetchData();
  }, [currentVault, fetchBribeInfo, fetchBalance, fetchTokenBalance]);

  // Handle deposit with optimized error handling
  const handleDeposit = useCallback(async () => {
    if (!isConnected) {
      toast('Please connect your wallet.');
      return;
    }

    try {
      const provider = new BrowserProvider(walletProvider, chainId);
      const signer = await provider.getSigner();
      const amountInWei = (Number(amnt) * 10 ** Number(decimals)).toString();

      const tokenContract = new Contract(
        currentErc20.tokenAddress,
        currentErc20.tokenAbi,
        signer
      );

      // First approval
      const approval = await tokenContract.approve(
        currentVault.proxyAddress,
        amountInWei
      );
      await approval.wait();

      // Then bribe
      const proxyContract = new Contract(
        currentVault.proxyAddress,
        currentVault.abi,
        signer
      );
      const depositTx = await proxyContract.bribe(
        amountInWei,
        currentErc20.tokenAddress
      );
      await depositTx.wait();

      // Refresh data
      await Promise.all([fetchBribeInfo(), fetchBalance(), fetchTokenBalance()]);
      toast.success('Deposit successful');
    } catch (error) {
      console.error('Deposit failed:', error);
      toast.error('Deposit failed. Please try again.');
    }
  }, [
    isConnected,
    walletProvider,
    chainId,
    amnt,
    decimals,
    currentErc20,
    currentVault,
    fetchBribeInfo,
    fetchBalance,
    fetchTokenBalance
  ]);

 

  return (
    <DialogContent className="bg-cream border-gunmetal overflow-hidden rounded-2xl p-0 sm:max-w-[550px] [&>button]:hidden">
      <DialogHeader className="hidden">
        <DialogTitle>Manual</DialogTitle>
        <DialogDescription>Bribe Dashboard</DialogDescription>
      </DialogHeader>

      <Tabs defaultValue="add" className="font-Teko flex w-full">
        <TabsList className="h-12 w-full rounded-none border-b !border-black p-0">
          <TabsTrigger
            value="add"
            className="data-[state=active]:bg-yellow font-Teko rounded-none text-lg leading-relaxed font-semibold shadow-none"
          >
            Add Bribe
          </TabsTrigger>
          <TabsTrigger
            value="track"
            className="data-[state=active]:bg-yellow font-Teko rounded-none text-lg leading-relaxed font-semibold shadow-none"
          >
            Track Bribe
          </TabsTrigger>
        </TabsList>
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
                  Adding bribes to the vault can attract more liquidity
                  providers. Anyone can contribute bribes, though its usually
                  done by projects.
                </p>
              </HoverCardContent>
            </HoverCard>
          </p>

          <Select
            onValueChange={(value) => setSelectedVaultIndex(parseFloat(value))}
            defaultValue={`${selectedVaultIndex}`}
          >
            <SelectTrigger className="[&_*]:font-Teko border-gunmetal !font-Teko [&_*]leading-loose w-full font-semibold shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bordrer-2 border-gunmetal">
              {dataArr.map((vault, i) => (
                <SelectItem
                  className="[&_*]:font-Teko font-semibold"
                  key={vault.proxyAddress}
                  value={`${i}`}
                >
                  <img
                    src={vault.img}
                    alt="vault logo"
                    className="mr-2 inline-block h-6 w-6 rounded-full"
                  />
                  {vault.title} - {vault.tokenSymbol} Vault
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="bg-yellow border-gunmetal mt-4 flex justify-around rounded-xl border p-2">
            <div className="flex flex-col items-center">
              <span className="text-sm">Vault liquidity</span>
              <span className="font-Teko font-semibold"> {dataArr[selectedVaultIndex].price*dataArr[selectedVaultIndex].totalSupply} {dataArr[selectedVaultIndex].tokenSymbol} </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm">Bribe Lock</span>
              <span className="font-Teko font-semibold"> {selectedVault&&selectedVault.lockedInPeriod} </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm">You Bribed</span>
              <span className="font-Teko font-semibold"> {ethers.formatUnits(bribe,decimals) } {erc20Arr[erc20Index].title} </span>
            </div>
          </div>

          <p className="font-Teko my-2 flex items-center gap-2 leading-relaxed font-semibold">
            Select token to bribe
          </p>
          <div className="border-gunmetal flex gap-1 rounded-xl border bg-white p-1">
            <input
              defaultValue={amnt}
              onChange={(i) => {
                setAmnt(Number(i.target.value));
              }}
              type="number"
              className="bg-yellow border-gunmetal flex-1 rounded-xl border p-2 py-1"
            ></input>
            <Select
              defaultValue={`${erc20Index}`}
              onValueChange={(value) => setErc20Index(parseFloat(value))}
            >
              <SelectTrigger className="[&_*]:font-Teko !font-Teko [&_*]leading-loose w-24 font-semibold shadow-none">
                <SelectValue />
              </SelectTrigger>

              <SelectContent className="bordrer-2 border-gunmetal">
                {erc20Arr.map((token, i) => {
                  return (
                    <SelectItem
                      className="[&_*]:font-Teko font-semibold"
                      value={`${i}`}
                      key={token.tokenAddress}
                    >
                      <img
                        src={token.img}
                        alt="vault logo"
                        className="mr-2 inline-block h-6 w-6 rounded-full"
                      />
                      {token.title}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="text-end text-sm">
          Balance:{' '}
            {formatBalance(userBalance.toString(), decimals).slice(0, 7)}{' '}
            {erc20Arr[erc20Index].title}
          </div>

          <Dialog>
            <DialogTrigger>
              <Button
                variant="outline"
                className="bg-yellow hover:bg-amber border-gunmetal font-Teko mx-auto rounded-lg px-12 text-lg font-semibold text-black"
                onClick={handleDeposit}
              >
                Deposit Bribes
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-cream border-gunmetal rounded-2xl">
              <DialogHeader>
                <DialogTitle className="font-Teko text-center text-2xl font-semibold">
                  Deposit Confirmation
                </DialogTitle>
                <DialogDescription className="bg-cream flex flex-col pt-4">
                  <div className="border-gunmetal flex-start flex w-full flex-col border bg-white p-1 px-4">
                    <p className="font-Teko text-start text-sm leading-relaxed font-semibold text-black/70">
                      You are Bribing
                    </p>
                    <p className="font-Teko text-start text-lg leading-relaxed font-semibold text-black">
                      {amnt}
                    </p>
                  </div>
                  <p className="text-end"> Balance:{' '}
            {formatBalance(userBalance.toString(), decimals).slice(0, 7)}{' '}
            {erc20Arr[erc20Index].title}</p>
                  <div className="border-gunmetal flex-start flex w-full flex-col border bg-white p-1 px-4">
                    <p className="font-Teko text-start text-sm leading-relaxed font-semibold text-black/70">
                      For
                    </p>
                    <p className="font-Teko text-start text-lg leading-relaxed font-semibold text-black">
                      Curvance x Fastlane - shMON Vault
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="bg-yellow hover:bg-amber border-gunmetal font-Teko mx-auto mt-4 rounded-lg px-12 text-lg font-semibold text-black"
                  >
                    Deposit
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </TabsContent>
        <TabsContent
          value="track"
          className="min-h-[300px] w-full p-4 px-8 max-sm:px-3"
        >
          <p className="font-Teko mb-2 flex items-center gap-2 leading-relaxed font-semibold">
            Select Vault to Track
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
              <HoverCardContent className="bg-yellow border-gunmetal rounded-xl border">
                <p className="text-center">
                  Select a vault to track the bribes. Currently, it supports
                  three tokens by default, with the option to add customs based
                  on project needs.
                </p>
              </HoverCardContent>
            </HoverCard>
          </p>

          <Select
            onValueChange={(value) => setSelectedVaultIndex(parseFloat(value))}
            defaultValue={`${selectedVaultIndex}`}
          >
            <SelectTrigger className="[&_*]:font-Teko border-gunmetal !font-Teko [&_*]leading-loose w-full font-semibold shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bordrer-2 border-gunmetal">
              {dataArr.map((vault, i) => (
                <SelectItem
                  className="[&_*]:font-Teko font-semibold"
                  key={vault.proxyAddress}
                  value={`${i}`}
                >
                  <img
                    src={vault.img}
                    alt="vault logo"
                    className="mr-2 inline-block h-6 w-6 rounded-full"
                  />
                  {vault.title} - {vault.tokenSymbol} Vault
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="bg-yellow border-gunmetal mt-4 flex justify-around rounded-xl border p-2">
          <div className="flex flex-col items-center">
              <span className="text-sm">Vault liquidity</span>
              <span className="font-Teko font-semibold"> {dataArr[selectedVaultIndex].price*dataArr[selectedVaultIndex].totalSupply} {dataArr[selectedVaultIndex].tokenSymbol} </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm">Bribe Lock</span>
              <span className="font-Teko font-semibold"> {selectedVault&&selectedVault.lockedInPeriod} </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm">Bribe APY</span>
              <span className="font-Teko font-semibold">100%</span>
            </div>
          </div>

          <p className="font-Teko my-2 flex items-center gap-2 leading-relaxed font-semibold">
            Bribe in Tokens
          </p>
          <div className="border-gunmetal mb-4 flex justify-around gap-2 border bg-white p-4">
            {erc20Arr.map((i,index)=>{
              return <div className="flex gap-2">
              <div>
                <img
                  width={20}
                  className="mt-1 rounded-full"
                  src={i.img}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-Teko font-semibold">{i.title}</span>
                <span>{erc20TokenBalance[index] ?(ethers.formatUnits((erc20TokenBalance[index]).toString(),erc20Decimal[index])):'0' }</span>
              </div>
            </div>
            })}  

            
          </div>
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
}
