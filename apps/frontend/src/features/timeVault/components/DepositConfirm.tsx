import {
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { vaults } from '@/data/vaults';
import { useLiveFetch } from '@/lib/hooks/useFetch';
import { LuExternalLink } from 'react-icons/lu';

export default function DepositConfirm({ index }: { index: number }) {
  const vault = vaults[index];
  const { data: liveVaultsData } = useLiveFetch();
  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-Teko text-center text-3xl font-semibold tracking-wide">
          Deposit Sucessfull
        </DialogTitle>
        <DialogDescription className="font-Teko my-0 text-center tracking-wide">
          NFT issued as a proof of liquidity
        </DialogDescription>
      </DialogHeader>
      <section className="flex flex-col items-center justify-center gap-2">
        <img
          className="rounded-xl border border-black bg-white p-2"
          src={vault.nftImage}
          width={130}
        />
        <h3 className="font-Teko flex items-center gap-2 text-xl font-semibold tracking-wide">
          {vault.title} Vault NFT <LuExternalLink className="text-sm" />
        </h3>
        <div className="flex w-64 gap-2 text-sm">
          <a
            href={`https://magiceden.io/collections/monad-testnet/${liveVaultsData ? liveVaultsData[index].nftAddress : vault.nftAddress}`}
            className="border-gunmetal flex-1 rounded-lg border bg-white p-1 text-center font-semibold"
          >
            Marketplace
          </a>
          <button className="border-gunmetal relative flex-1 rounded-lg border bg-white p-1 text-center font-semibold">
            Borrow
            <div className="bg-yellow text-gunmetal font-Bubblegum border-gunmetal absolute -top-0.25 -right-0.25 flex flex-nowrap items-center rounded-full border p-[0.1px] pr-1 text-[8px] font-thin text-nowrap">
              <img width="15px" src="/images/soonCat.webp" alt="Soon Cat" />
              Thoon
            </div>
          </button>
        </div>
        <DialogTrigger className="bg-yellow font-Teko border-gunmetal max-w-64 rounded-xl border px-[30%] py-1 text-xl font-semibold text-black hover:bg-yellow-300">
          Dismiss
        </DialogTrigger>
      </section>
    </>
  );
}
