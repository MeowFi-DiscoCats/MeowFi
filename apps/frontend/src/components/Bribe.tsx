import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { dataArr } from '@/lib/default';
import { AiFillInfoCircle } from 'react-icons/ai';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

export default function Bribe() {
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
        <TabsContent value="add" className="min-h-[300px] w-full p-4 px-8">
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

          <Select defaultValue={dataArr[0].tokenAddress}>
            <SelectTrigger className="[&_*]:font-Teko border-gunmetal !font-Teko [&_*]leading-loose w-full font-semibold shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bordrer-2 border-gunmetal">
              {dataArr.map((vault) => (
                <SelectItem
                  className="[&_*]:font-Teko font-semibold"
                  key={vault.tokenAddress}
                  value={vault.tokenAddress}
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
        </TabsContent>
        <TabsContent value="track" className="min-h-[300px] w-full p-4 px-8">
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
              <HoverCardContent className="bg-yellow border-gunmetal w-[250px] rounded-xl border">
                <p className="text-center">
                  Select a vault to track the bribes. Currently, it supports
                  three tokens by default, with the option to add customs based
                  on project needs.
                </p>
              </HoverCardContent>
            </HoverCard>
          </p>

          <Select defaultValue={dataArr[0].tokenAddress}>
            <SelectTrigger className="[&_*]:font-Teko border-gunmetal !font-Teko [&_*]leading-loose w-full font-semibold shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bordrer-2 border-gunmetal">
              {dataArr.map((vault) => (
                <SelectItem
                  className="[&_*]:font-Teko font-semibold"
                  key={vault.tokenAddress}
                  value={vault.tokenAddress}
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
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
}
