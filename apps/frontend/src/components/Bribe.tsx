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
import { useEffect, useState } from 'react';
// import { shMonadErc20Addr } from '@/lib/address';
// import { tokenAbi } from '@/lib/abi.data';
// import { erc20NftTimeVaultCurvance, shMonadAbi } from '@/lib/abi';
import {
  useAppKitAccount,
  useAppKitNetworkCore,
  useAppKitProvider,
} from '@reown/appkit/react';
import { BrowserProvider, Contract, Eip1193Provider, ethers } from 'ethers';
import { formatBalance } from '@/lib/VaultHelper';
import { toast } from 'sonner';
// import { Vault } from 'lucide-react';
import {  IVault } from '../../../backend/src/models/IVault';
import { tokenAbi } from '@/lib/abi.data';
// import { useState } from 'react';

export default function Bribe() {
  const [erc20Index, setErc20Index] = useState(0);
  const [erc20TokenBalance, seterc20TokenBalance] = useState<number[]>([]);
  const [erc20Decimal, seterc20Decimal] = useState<number[]>([]);
  const [selectedVaultIndex, setSelectedVaultIndex] = useState(0);
  const [selectedVault, setSelectedVault] = useState<IVault>();
  const [amnt, setAmnt] = useState(500);
  const [userBalance, setuserBalance] = useState(0);
  const [decimals, setdecimals] = useState(0);
  // const [decimalsV2, setdecimalsV2] = useState(0);
  const [bribe, setbribe] = useState(0);

  const { isConnected, address } = useAppKitAccount();
  const { walletProvider }: { walletProvider: Eip1193Provider } =
    useAppKitProvider('eip155');
  const { chainId } = useAppKitNetworkCore();

  useEffect(() => {
    async function fetchBribeInfo() {
      const vault:IVault = dataArr[selectedVaultIndex];
      const erc20 = erc20Arr[erc20Index];
      setSelectedVault(vault)
      if (!address || !walletProvider) return;

      // setIsBalanceLoading(true);
      try {
        const provider = new BrowserProvider(walletProvider, chainId);
        // console.log(vault.proxyAddress);
        const proxyContract = new Contract(
          vault.proxyAddress,
          vault.abi,
          provider
        );
        const tokenContract = new Contract(
          vault.tokenAddress,
          vault.tokenAbi,
          provider
        );
        const decimal_ = await tokenContract.decimals();
        setdecimals(decimal_);
        const bribeInfo_ = await proxyContract.briber(address,erc20.tokenAddress);
        // console.log(bribeInfo_);
        setbribe(bribeInfo_)
        // setuserBalance(bribeInfo_.toString());
      } catch (error) {
        console.error('Error fetching available supply:', error);
      } finally {
        // setIsBalanceLoading(false);
      }
    }
    fetchBribeInfo();
  }, [address, selectedVaultIndex, walletProvider, chainId,erc20Index]);
  useEffect(() => {
    async function fetchBalance() {
      const vault:IVault = dataArr[selectedVaultIndex];
      const erc20 = erc20Arr[erc20Index];
      setSelectedVault(vault)
      if (!address || !walletProvider) return;

      // setIsBalanceLoading(true);
      try {
        const provider = new BrowserProvider(walletProvider, chainId);
        // console.log(vault.proxyAddress);
        const tokenContract = new Contract(
          erc20.tokenAddress,
          erc20.tokenAbi,
          provider
        );
        const decimal_ = await tokenContract.decimals();
        setdecimals(decimal_);

        const balance_ = await tokenContract.balanceOf(address);
        console.log(balance_);
        setuserBalance(balance_.toString());
      } catch (error) {
        console.error('Error fetching available supply:', error);
      } finally {
        // setIsBalanceLoading(false);
      }
    }
    fetchBalance();
  }, [address, selectedVaultIndex, walletProvider, chainId,erc20Index]);
  useEffect(() => {
    async function fetchTokenBalance() {
      const vault = dataArr[selectedVaultIndex];
      // const erc20 = erc20Arr[erc20Index];
      if (!isConnected) {
        toast('Please connect your wallet.');
        return;
      }
      // setDepositLoading(true);
      try {
        const provider = new BrowserProvider(walletProvider, chainId);
        const signer = await provider.getSigner();
  
        const proxyContract = new Contract(
          vault.proxyAddress,
          vault.abi,
          signer
        );
        
        let tempArr:any=[]
        let tempArr2:any=[]
        erc20Arr.map(async (i)=>{

          const bal=await proxyContract.bribes(i.tokenAddress)
          // console.log(bal)
          tempArr.push(Number(bal))


          const tokenContract = new Contract(
            i.tokenAddress,
            tokenAbi,
            signer
          );
          
            const dec=await tokenContract.decimals()
            // console.log(dec)
            tempArr2.push(dec)
        })
        seterc20TokenBalance(tempArr)
        seterc20Decimal(tempArr2)
      
      }catch(e){
  
        }
    }
    fetchTokenBalance();
  }, [address, selectedVaultIndex, walletProvider, chainId]);

  async function handleDeposit() {
    const vault = dataArr[selectedVaultIndex];
    const erc20 = erc20Arr[erc20Index];
    if (!isConnected) {
      toast('Please connect your wallet.');
      return;
    }
    // setDepositLoading(true);
    try {
      const provider = new BrowserProvider(walletProvider, chainId);
      const signer = await provider.getSigner();

      const tokenContract = new Contract(
        erc20.tokenAddress,
        erc20.tokenAbi,
        signer
      );
      const approval = await tokenContract.approve(
        vault.proxyAddress,
        (amnt * 10 ** Number(decimals)).toString()
      );

      const receiptApproval = await approval.wait();
      if (receiptApproval) {
        toast('Approval successful', {
          description: 'You have successfully Approved',
        });
        // setRefresher((prev) => prev + 1);
        //after approval
        const proxyContract = new Contract(
          vault.proxyAddress,
          vault.abi,
          signer
        );
        const depositTx = await proxyContract.bribe(
          (amnt * 10 ** Number(decimals)).toString(),
          erc20.tokenAddress
        );

        const receipt = await depositTx.wait();
        if (receipt) {
          toast('Deposit successful', {
            description: 'You have successfully deposited',
          });
          // setRefresher((prev) => prev + 1);
        }
      }
    } catch (error) {
      console.error('Error during deposit:', error);
      toast('Deposit failed', {
        description: 'Please try again',
      });
    } finally {
      // setDepositLoading(false);
    }
  }


  
  

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
                <span>{erc20TokenBalance.length>0 ?(ethers.formatUnits((erc20TokenBalance[index]).toString(),erc20Decimal[index])):'0' }</span>
              </div>
            </div>
            })}  

            
          </div>
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
}
