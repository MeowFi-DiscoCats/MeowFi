import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import Manual from './Manual';
import Bribe from './Bribe';

export default function VaultHeader() {
  return (
    <>
      <div className="flex items-center justify-between gap-4 max-sm:justify-center">
        <h1 className="text-orange font-Showcard text-[28px] uppercase sm:text-4xl [518px]:text-nowrap">
          Time-Lock Vaults
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
      <p className="text-gunmetal my-4 mb-8 font-thin">
        Earn Multi-layered yield while staying Liquid with NFTs.{' '}
      </p>
    </>
  );
}
