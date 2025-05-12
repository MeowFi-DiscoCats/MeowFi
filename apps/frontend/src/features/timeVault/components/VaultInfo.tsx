import {
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { LucideChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { vaults } from '@/data/vaults';

export function VaultInfo({ index }: { index: number }) {
  const [copied, setCopied] = useState(false);
  const vault = vaults[index];

  const handleCopy = () => {
    navigator.clipboard.writeText(vault.proxyAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <DialogHeader>
      <div className="flex items-center justify-between gap-4 max-[430px]:flex-col">
        <div className="flex items-center gap-4 max-[430px]:w-full">
          <DialogClose className="bg-amber rounded-full p-2">
            <LucideChevronLeft />
          </DialogClose>
          <div>
            <DialogTitle className="font-Teko text-gunmetal text-start text-2xl font-semibold">
              {vault.title}
            </DialogTitle>
            <DialogDescription className="flex items-center max-md:hidden">
              <span className="text-gunmetal/80 text-sm capitalize">
                <strong>Type: </strong>
                {vault.type}
              </span>
              <span className="text-gunmetal/80 ml-2 flex items-center text-sm">
                <strong className="mr-1">Vault: </strong>{' '}
                {vault.proxyAddress.slice(0, 10)}...
                <button
                  onClick={handleCopy}
                  className="hover:bg-yellow bg-amber ml-2 rounded p-1 px-2 text-xs text-black transition"
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </span>
            </DialogDescription>
          </div>
        </div>
        <div className="text-center max-[430px]:w-full">
          <span className="bg-amber flex flex-wrap justify-center rounded-lg p-1 px-3">
            Limit per wallet:{vault.nftLimit}
          </span>
        </div>
      </div>
      <DialogDescription className="flex items-center text-start md:hidden">
        <span className="text-gunmetal/80 text-sm">
          <strong className="mr-1">Type: </strong>
          {vault.type}
        </span>
        <span className="text-gunmetal/80 ml-2 flex items-center text-sm">
          <strong className="mr-1">Vault: </strong>
          {vault.proxyAddress.slice(0, 10)}...
          <button
            onClick={handleCopy}
            className="hover:bg-yellow bg-amber ml-2 rounded p-1 px-2 text-xs text-black transition"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </span>
      </DialogDescription>
    </DialogHeader>
  );
}
