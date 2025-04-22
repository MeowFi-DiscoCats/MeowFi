import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { DialogContent } from '@/components/ui/dialogCustom';
import { VaultInfo } from './VaultInfo';
import { VaultMetrics } from './VaultMetrics';
import { VaultActions } from './VaultActionsPanel';

export default function VaultDetailDialog({ index }: { index: number }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="m-4">
          <button className="border-gunmetal bg-crimson shadow-inner-custom2 font-Bubblegum w-full rounded-xl border-1 p-2 text-center text-xl text-white uppercase hover:saturate-150">
            Join the Vault
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-cream max-[520px]:rounded-none max-[520px]:px-4 max-[520px]:py-12 md:p-10 [&>button]:hidden">
        <VaultInfo index={index} />
        <section className="flex gap-4 max-[520px]:flex-col-reverse">
          <VaultMetrics index={index} />
          <VaultActions index={index} />
        </section>
      </DialogContent>
    </Dialog>
  );
}
