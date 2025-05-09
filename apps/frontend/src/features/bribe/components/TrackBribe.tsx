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
import { useBribeFetch } from '../hooks/useFetch';
import { useState } from 'react';

export default function TrackBribe() {
  const [selectedVaultIndex, setSelectedVaultIndex] = useState(0);
  const { data: bribeData } = useBribeFetch(selectedVaultIndex);
  const vault = vaults[selectedVaultIndex];

  return (
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
              Select a vault to track the bribes. Currently, it supports three
              tokens by default, with the option to add customs based on project
              needs.
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
          <span className="text-sm">Bribe APY</span>
          <span className="font-Teko font-semibold">90%</span>
        </div>
      </div>

      <p className="font-Teko my-2 flex items-center gap-2 leading-relaxed font-semibold">
        Bribe in Tokens
      </p>
      <div className="border-gunmetal mb-4 flex flex-wrap justify-around gap-2 border bg-white p-4">
        {tokens.map((token, index) =>
          token.isErc20 ? (
            <div className="flex gap-2" key={index}>
              <div>
                <img
                  width={20}
                  className="mt-1 rounded-full"
                  src={token.img}
                  alt={token.symbol}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-Teko font-semibold">{token.symbol}</span>
                <span>{bribeData ? bribeData.bribes[index].amount : 0}</span>
              </div>
            </div>
          ) : null
        )}
      </div>
    </TabsContent>
  );
}
