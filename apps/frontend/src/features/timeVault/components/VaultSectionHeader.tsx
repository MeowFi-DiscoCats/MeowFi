import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import Manual from '@/components/Manual';
import Bribe from '@/features/bribe/components/BribeDialog';
import ReferralDialog from '@/components/ReferralDialog';
import HeaderCarousel from '@/components/HeaderCarousel';

export default function VaultHeader() {
  return (
    <>
      <div className="flex items-center justify-between gap-4 max-sm:justify-center">
        <h1 className="font-Showcard text-[28px] text-black uppercase sm:text-4xl [518px]:text-nowrap">
          Meow Vaults
        </h1>
        <div className="[&>span]:border-gunmetal text-chocolate [&>span]:font-Bubblegum flex w-full min-w-[210px] flex-1 flex-wrap items-center justify-end gap-2 max-[518px]:hidden [&>*]:h-[36px] [&>*]:shrink-0 [&>*]:items-center [&>*]:rounded-xl [&>*]:px-3 [&>*]:py-1 [&>span]:flex [&>span]:gap-1 [&>span]:border [&>span]:bg-[#FFF2EA]">
          <span>
            <img width="30px" src="/images/shibaCoin.webp" alt="token" />
            Token
          </span>
          <span>
            <img
              width="18px"
              className="p-[1px] shadow"
              src="/images/danceCat.webp"
              alt="NFTs"
            />
            NFTs
          </span>
          <Dialog>
            <DialogTrigger asChild>
              <button className="bg-yellow border-gunmetal hover:bg-yellow/90 text-gunmetal shadow-b-3 border font-semibold shadow-[0_4px_10px_rgba(0,0,0,0.25)]">
                Bribes
              </button>
            </DialogTrigger>
            <Bribe />
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <button className="bg-yellow border-gunmetal hover:bg-yellow/90 text-gunmetal shadow-b-3 border font-semibold shadow-[0_4px_10px_rgba(0,0,0,0.25)]">
                Manual
              </button>
            </DialogTrigger>
            <Manual />
          </Dialog>
        </div>
      </div>
      <p className="border-gunmetal font-Bubblegum my-2 border bg-white p-0.5 text-center text-xs sm:hidden">
        Please use a desktop for full functionality and the best experience.
      </p>
      <div className="bg-gunmetal mt-4 -mb-4 flex items-center justify-center rounded-2xl">
        <HeaderCarousel />
        <div className="border-gunmetal bg-gunmetal flex min-w-[240px] items-center justify-around gap-4 rounded-r-xl border-1 p-2 py-4 text-white shadow max-md:rounded-l-xl">
          <div className="[&>*]:font-Bubblegum flex flex-col gap-2 text-center">
            <span>APR up to</span>
            <span>27318.12%</span>
          </div>
          <div className="[&>*]:font-Bubblegum flex flex-col gap-2 text-center">
            <span>TVL</span>
            <span>$4.1M</span>
          </div>
        </div>
      </div>
      <ReferralDialog />
      <p className="text-gunmetal font-Bubblegum my-4 mb-8 text-3xl">
        Bribe Lock Vaults
      </p>
    </>
  );
}
