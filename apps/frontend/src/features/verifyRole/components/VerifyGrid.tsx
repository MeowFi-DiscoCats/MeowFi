import { useState } from 'react';
import { vaults } from '@/data/vaults';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import MeowfiCard from './MeowfiCard';
import FastLaneCard from './FastlaneCard';
export default function VerifyGrid() {
  const [selectedVaultIndex, setSelectedVaultIndex] = useState(0);
  return (
    <main className="mt-12 flex flex-col items-center justify-center gap-4">
      <Select
        onValueChange={(val) => setSelectedVaultIndex(Number(val))}
        defaultValue={`${selectedVaultIndex}`}
      >
        <SelectTrigger className="[&_*]:font-Teko border-gunmetal bg-cream !font-Teko [&_*]leading-loose w-full max-w-72 font-semibold shadow-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bordrer-2 bg-cream border-gunmetal">
          {vaults.map((v, idx) => (
            <SelectItem
              className="[&_*]:font-Teko font-semibold"
              key={v.proxyAddress}
              value={`${idx}`}
            >
              <img
                src={v.nftImage}
                alt="vault logo"
                className="mr-2 inline-block h-6 w-6"
              />
              {v.title} - Liquid {v.nftName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
        <MeowfiCard index={selectedVaultIndex} />
        <FastLaneCard index={selectedVaultIndex} />
      </div>
    </main>
  );
}
