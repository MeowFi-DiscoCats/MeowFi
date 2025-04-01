import {
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { LucideChevronLeft } from 'lucide-react';
import {  useState } from 'react';
import { IVault } from '../../../../backend/src/models/IVault';
import { dataArr } from '@/lib/default';

export function VaultHeader({ index }: { index: number }) {
  const [copied, setCopied] = useState(false);
  // const vaults: IVault[] = queryClient.getQueryData(['vaults'])!;
  const vaults: IVault[] = dataArr
  const vault = vaults[index];
  




  const handleCopy = () => {
    navigator.clipboard.writeText(vault.proxyAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <DialogHeader>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <DialogClose className="bg-amber rounded-full p-2">
            <LucideChevronLeft />
          </DialogClose>
          <div>
            <DialogTitle className="font-Teko text-gunmetal text-start text-2xl font-semibold">
              {vault.title}
            </DialogTitle>
            <DialogDescription className="flex max-md:hidden">
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
        <div>
          <span className="bg-amber rounded-lg p-1 px-3">
            Limit per wallet:{vault.NFTLimit}
          </span>
        </div>
      </div>
      <DialogDescription className="text-start md:hidden">
        <span className="text-gunmetal/80 text-sm">
          <strong>Type: </strong>
          {vault.type}
        </span>
        <span className="text-gunmetal/80 ml-2 text-sm">
          <strong>Vault: </strong>
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
