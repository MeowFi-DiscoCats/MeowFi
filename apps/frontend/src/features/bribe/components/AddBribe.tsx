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
import { useState } from 'react';
import DepositBribeDialog from './DepositBribeDialog';
import { tokens } from '@/data/tokens';

export default function AddBribe() {
  const [selectedVaultIndex, setSelectedVaultIndex] = useState(0);
  const [selectedTokenIndex, setSelectedTokenIndex] = useState(0);
  const vault = vaults[selectedVaultIndex];
  const [amount, setAmount] = useState(100);

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
              Anyone can contribute bribes, though its usually done by projects.
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
          {vaults.map((vault, i) => (
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
              {vault.title} - {vault.token.symbol} Vault
            </SelectItem>
          ))}
        </SelectContent>
      </Select>{' '}
      <div className="bg-yellow border-gunmetal mt-4 flex justify-around rounded-xl border p-2">
        <div className="flex flex-col items-center">
          <span className="text-sm">Vault liquidity</span>
          <span className="font-Teko font-semibold">
            2000 {vault.token.symbol}
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
          <span className="font-Teko font-semibold">0</span>
        </div>
      </div>
      <p className="font-Teko mt-4 mb-2 flex items-center gap-2 leading-relaxed font-semibold">
        Select token to bribe
      </p>
      <div className="border-gunmetal flex gap-1 rounded-xl border bg-white p-1 px-2">
        <input
          placeholder="500"
          type="number"
          defaultValue={100}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className="bg-yellow border-gunmetal flex-1 rounded-xl border p-2 py-1"
        ></input>
        <div className="flex flex-1 justify-end">
          <Select
            onValueChange={(value) => setSelectedTokenIndex(parseFloat(value))}
            defaultValue={`${selectedTokenIndex}`}
          >
            <SelectTrigger className="[&_*]:font-Teko !font-Teko [&_*]leading-loose w-28 border-none font-semibold shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bordrer-2 border-gunmetal flex-1">
              {tokens.map((token, i) => (
                <SelectItem
                  className="[&_*]:font-Teko font-semibold"
                  key={token.symbol}
                  value={`${i}`}
                >
                  <img
                    src={token.img}
                    alt="vault logo"
                    className="mr-2 inline-block h-6 w-6 rounded-full"
                  />
                  {token.symbol}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="pr-2 text-end text-sm">Balance: 0.234</div>
      <DepositBribeDialog
        amount={amount}
        selectedVaultIndex={selectedVaultIndex}
        selectedTokenIndex={selectedTokenIndex}
      />
    </TabsContent>
  );
}
