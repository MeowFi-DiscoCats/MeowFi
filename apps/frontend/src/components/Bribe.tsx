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
// import { useState } from 'react';

export default function Bribe() {

  // const [erc20,setErc20]=useState()
  // const [vaultSelected,setVaultSelected]=useState()
  // const [amnt,setAmnt]=useState()



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

          <Select defaultValue={dataArr[0].title}>
            <SelectTrigger className="[&_*]:font-Teko border-gunmetal !font-Teko [&_*]leading-loose w-full font-semibold shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bordrer-2 border-gunmetal">
              {dataArr.map((vault) => (
                <SelectItem
                  className="[&_*]:font-Teko font-semibold"
                  key={vault.tokenAddress}
                  value={vault.title}
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
              <span className="font-Teko font-semibold">1M $MON</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm">Bribe Lock</span>
              <span className="font-Teko font-semibold">30 Days</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm">You Bribed</span>
              <span className="font-Teko font-semibold">0</span>
            </div>
          </div>

          <p className="font-Teko my-2 flex items-center gap-2 leading-relaxed font-semibold">
            Select token to bribe
          </p>
          <div className="border-gunmetal flex gap-1 rounded-xl border bg-white p-1">
            <input type='number' className="bg-yellow border-gunmetal flex-1 rounded-xl border p-2 py-1">
              
            </input>
            <Select defaultValue="MON">
              <SelectTrigger className="[&_*]:font-Teko !font-Teko [&_*]leading-loose w-24 font-semibold shadow-none">
                <SelectValue />
              </SelectTrigger>
              
              <SelectContent className="bordrer-2 border-gunmetal">
              {
                erc20Arr.map((i)=>{
                  return <SelectItem
                  
                  className="[&_*]:font-Teko font-semibold"
                  value={i.title}
                  
                >
                  <img
                    src={i.img}
                    alt="vault logo"
                    className="mr-2 inline-block h-6 w-6 rounded-full"
                  />
                  {i.title}
                </SelectItem>
                  
                })
              }
               
              </SelectContent>
            </Select>
          </div>
          <div className="text-end text-sm">Balance: 0.234</div>

          <Dialog>
            <DialogTrigger>
              <Button
                variant="outline"
                className="bg-yellow hover:bg-amber border-gunmetal font-Teko mx-auto rounded-lg px-12 text-lg font-semibold text-black"
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
                      500 MON
                    </p>
                  </div>
                  <p className="text-end">Balance: 23.34</p>
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

          <Select defaultValue={dataArr[0].title}>
            <SelectTrigger className="[&_*]:font-Teko border-gunmetal !font-Teko [&_*]leading-loose w-full font-semibold shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bordrer-2 border-gunmetal">
              {dataArr.map((vault) => (
                <SelectItem
                  className="[&_*]:font-Teko font-semibold"
                  key={vault.tokenAddress}
                  value={vault.title}
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
              <span className="font-Teko font-semibold">1M $MON</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm">Bribe Lock</span>
              <span className="font-Teko font-semibold">30 Days</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm">Bribe APY</span>
              <span className="font-Teko font-semibold">789.15%</span>
            </div>
          </div>

          <p className="font-Teko my-2 flex items-center gap-2 leading-relaxed font-semibold">
            Bribe in Tokens
          </p>
          <div className="border-gunmetal mb-4 flex justify-around gap-2 border bg-white p-4">
            <div className="flex gap-2">
              <div>
                <img
                  width={20}
                  className="mt-1 rounded-full"
                  src="/images/monad.webp"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-Teko font-semibold">MON</span>
                <span>3824.3</span>
              </div>
            </div>
            <div className="flex gap-2">
              <div>
                <img
                  width={20}
                  className="mt-1 rounded-full"
                  src="/images/usdt.webp"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-Teko font-semibold">USDT</span>
                <span>3824.3</span>
              </div>
            </div>
            <div className="flex gap-2">
              <div>
                <img
                  width={20}
                  className="mt-1 rounded-full"
                  src="/images/usdc.webp"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-Teko font-semibold">USDC</span>
                <span>3824.3</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
}
