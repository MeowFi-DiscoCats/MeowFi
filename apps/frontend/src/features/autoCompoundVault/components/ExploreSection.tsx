import Lock from '@/components/svg/Lock';
import { BsSortDownAlt } from 'react-icons/bs';
import { LuSearch } from 'react-icons/lu';

export default function ExploreSection() {
  return (
    <section>
      <h2 className="font-Bubblegum text-4xl">Explore</h2>
      <div className="my-4 flex items-center justify-between gap-2">
        <div className="relative w-72 max-sm:w-full">
          <LuSearch
            size={18}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
          />

          <input
            type="search"
            placeholder="Search by token or protocol"
            className="border-gunmetal w-full rounded-lg border bg-white p-2 pl-10 font-semibold"
          />
        </div>{' '}
        <p className="border-gunmetal bg-yellow rounded-lg border px-2 py-0.5 max-sm:hidden">
          Earn auto-compounded yield in one click
        </p>
      </div>
      <div className="flex items-center justify-between gap-2 px-4 max-sm:hidden">
        <span className="font-Bubblegum flex-1 pr-6">Vault</span>
        <span className="font-Bubblegum flex-1">Protocol</span>
        <span className="font-Bubblegum flex flex-1 items-center gap-1">
          APY <BsSortDownAlt />
        </span>
        <span className="font-Bubblegum flex flex-1 items-center gap-1">
          TLR <BsSortDownAlt />
        </span>
        <span className="font-Bubblegum flex-1">Stake</span>
      </div>
      <div className="border-gunmetal relative border-1 bg-white p-0.25">
        <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center bg-black/40">
          <div className="bg-yellow rounded-xl p-0.5">
            <div className="bg-cream font-Bubblegum border-gunmetal flex items-center gap-1 rounded-xl border px-3 py-1 text-center text-sm text-black">
              <Lock />
              <span className="font-Bubblegum text-xl">Coming Soon</span>
            </div>
          </div>
        </div>
        <div className="bg-gunmetal flex flex-wrap items-center justify-between gap-4 border-b border-white px-4 py-4 text-white max-sm:text-center">
          <span className="font-Bubblegum flex min-w-[140px] flex-1 items-center text-nowrap">
            <div className="flex shrink-0 items-center justify-center">
              <img
                width={20}
                src="/images/monad.webp"
                className="-mr-3 w-5 rounded-full border border-white"
                alt="coin"
              />
              <img
                width={20}
                src="/images/usdc.webp"
                className="mr-3 w-5 rounded-full border border-white"
                alt="coin"
              />
            </div>
            WMON-USDC
          </span>
          <span className="font-Bubblegum flex flex-1 items-center">
            <img
              width={20}
              className="mr-2 rounded-full border border-white"
              src="/images/cfCard1.webp"
            />
            Curvance
          </span>
          <span className="font-Bubblegum flex flex-1 items-center gap-1">
            8932.25%
          </span>
          <span className="font-Bubblegum flex flex-1 items-center gap-1">
            $324.12M
          </span>
          <span className="font-Bubblegum flex-1">
            <span className="bg-yellow rounded-lg px-4 py-1 text-black">
              Stake
            </span>
          </span>
        </div>
        <div className="bg-gunmetal flex flex-wrap items-center justify-between gap-4 border-b border-white px-4 py-4 text-white max-sm:text-center">
          <span className="font-Bubblegum flex min-w-[140px] flex-1 items-center text-nowrap">
            <div className="flex shrink-0 items-center justify-center">
              <img
                width={20}
                src="/images/monad.webp"
                className="-mr-3 w-5 rounded-full border border-white"
                alt="coin"
              />
              <img
                width={20}
                src="/images/usdc.webp"
                className="mr-3 w-5 rounded-full border border-white"
                alt="coin"
              />
            </div>
            WMON-USDC
          </span>
          <span className="font-Bubblegum flex flex-1 items-center">
            <img
              width={20}
              className="mr-2 rounded-full border border-white"
              src="/images/nitroFTL.webp"
            />
            NitroFTL
          </span>
          <span className="font-Bubblegum flex flex-1 items-center gap-1">
            8932.25%
          </span>
          <span className="font-Bubblegum flex flex-1 items-center gap-1">
            $324.12M
          </span>
          <span className="font-Bubblegum flex-1">
            <span className="bg-yellow rounded-lg px-4 py-1 text-black">
              Stake
            </span>
          </span>
        </div>
        <div className="bg-gunmetal flex flex-wrap items-center justify-between gap-4 border-b border-white px-4 py-4 text-white max-sm:text-center">
          <span className="font-Bubblegum flex min-w-[140px] flex-1 items-center text-nowrap">
            <div className="flex shrink-0 items-center justify-center">
              <img
                width={20}
                src="/images/monad.webp"
                className="-mr-3 w-5 rounded-full border border-white"
                alt="coin"
              />
              <img
                width={20}
                src="/images/usdc.webp"
                className="mr-3 w-5 rounded-full border border-white"
                alt="coin"
              />
            </div>
            WMON-USDC
          </span>
          <span className="font-Bubblegum flex flex-1 items-center">
            <img
              width={20}
              className="mr-2 rounded-full border border-white"
              src="/images/beam.webp"
            />
            Beam
          </span>
          <span className="font-Bubblegum flex flex-1 items-center gap-1">
            8932.25%
          </span>
          <span className="font-Bubblegum flex flex-1 items-center gap-1">
            $324.12M
          </span>
          <span className="font-Bubblegum flex-1">
            <span className="bg-yellow rounded-lg px-4 py-1 text-black">
              Stake
            </span>
          </span>
        </div>
        <div className="bg-gunmetal flex flex-wrap items-center justify-between gap-4 border-b border-white px-4 py-4 text-white max-sm:text-center">
          <span className="font-Bubblegum flex min-w-[140px] flex-1 items-center text-nowrap">
            <div className="flex shrink-0 items-center justify-center">
              <img
                width={20}
                src="/images/monad.webp"
                className="-mr-3 w-5 rounded-full border border-white"
                alt="coin"
              />
              <img
                width={20}
                src="/images/usdc.webp"
                className="mr-3 w-5 rounded-full border border-white"
                alt="coin"
              />
            </div>
            WMON-USDC
          </span>
          <span className="font-Bubblegum flex flex-1 items-center">
            <img
              width={20}
              className="mr-2 rounded-full border border-white"
              src="/images/cfCard1.webp"
            />
            Curvance
          </span>
          <span className="font-Bubblegum flex flex-1 items-center gap-1">
            8932.25%
          </span>
          <span className="font-Bubblegum flex flex-1 items-center gap-1">
            $324.12M
          </span>
          <span className="font-Bubblegum flex-1">
            <span className="bg-yellow rounded-lg px-4 py-1 text-black">
              Stake
            </span>
          </span>
        </div>
        <div className="bg-gunmetal flex flex-wrap items-center justify-between gap-4 border-b border-white px-4 py-4 text-white max-sm:text-center">
          <span className="font-Bubblegum flex min-w-[140px] flex-1 items-center text-nowrap">
            <div className="flex shrink-0 items-center justify-center">
              <img
                width={20}
                src="/images/monad.webp"
                className="-mr-3 w-5 rounded-full border border-white"
                alt="coin"
              />
              <img
                width={20}
                src="/images/usdc.webp"
                className="mr-3 w-5 rounded-full border border-white"
                alt="coin"
              />
            </div>
            WMON-USDC
          </span>
          <span className="font-Bubblegum flex flex-1 items-center">
            <img
              width={20}
              className="mr-2 rounded-full border border-white"
              src="/images/nitroFTL.webp"
            />
            NitroFTL
          </span>
          <span className="font-Bubblegum flex flex-1 items-center gap-1">
            8932.25%
          </span>
          <span className="font-Bubblegum flex flex-1 items-center gap-1">
            $324.12M
          </span>
          <span className="font-Bubblegum flex-1">
            <span className="bg-yellow rounded-lg px-4 py-1 text-black">
              Stake
            </span>
          </span>
        </div>
        <div className="bg-gunmetal flex flex-wrap items-center justify-between gap-4 border-b border-white px-4 py-4 text-white max-sm:text-center">
          <span className="font-Bubblegum flex min-w-[140px] flex-1 items-center text-nowrap">
            <div className="flex shrink-0 items-center justify-center">
              <img
                width={20}
                src="/images/monad.webp"
                className="-mr-3 w-5 rounded-full border border-white"
                alt="coin"
              />
              <img
                width={20}
                src="/images/usdc.webp"
                className="mr-3 w-5 rounded-full border border-white"
                alt="coin"
              />
            </div>
            WMON-USDC
          </span>
          <span className="font-Bubblegum flex flex-1 items-center">
            <img
              width={20}
              className="mr-2 rounded-full border border-white"
              src="/images/beam.webp"
            />
            Beam
          </span>
          <span className="font-Bubblegum flex flex-1 items-center gap-1">
            8932.25%
          </span>
          <span className="font-Bubblegum flex flex-1 items-center gap-1">
            $324.12M
          </span>
          <span className="font-Bubblegum flex-1">
            <span className="bg-yellow rounded-lg px-4 py-1 text-black">
              Stake
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
