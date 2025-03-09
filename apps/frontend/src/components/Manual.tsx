import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { DialogClose } from '@radix-ui/react-dialog';
import { useState } from 'react';

export default function Manual() {
  const [currentPage, setCurrentPage] = useState(0);

  const renderContent = () => {
    switch (currentPage) {
      case 0:
        return (
          <div>
            <img
              width="550px"
              className="w-full"
              src="/images/manualBanner.webp"
              alt="banner"
            />
            <div className="p-4">
              <h2 className="text-xl font-extrabold">
                The New Playground for Cats!
              </h2>
              <p className="py-1 text-sm">
                Lock your assets, stack rewards, and maximize yield with our
                <strong> multi-layered yield vaults! </strong> Choose between
                <strong> Fixed Lock-Up Vaults</strong> for higher yield or
                <strong>Flexible Lock-Up Vaults </strong> for tradable
                positions.
              </p>
              <div className="mt-4 flex gap-4 font-semibold max-md:gap-2 max-md:text-xs">
                <button className="flex-1 rounded-md border border-black p-1 shadow-[0_4px_4px_#BFBFBF] max-md:p-2">
                  <DialogClose className="w-full">I know my thing!</DialogClose>
                </button>
                <button
                  onClick={() => setCurrentPage(1)}
                  className="bg-yellow max-md;p-2 flex-1 rounded-md border border-black shadow-[0_4px_4px_#BFBFBF]"
                >
                  Show me around!
                </button>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col p-4">
            <div className="my-8 flex items-center gap-8 max-[550px]:flex-col">
              <img
                width="250px"
                className="flex-1"
                src="/images/burger.webp"
                alt="burger"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold">How its Works?</h2>
                <ul className="mt-3 list-disc text-sm max-[500px]:pl-4">
                  <li>
                    <strong>Deposit Funds </strong> – Choose Fixed or Flexible
                    Vaults to lock your assets.
                  </li>

                  <li>
                    <strong>Earn Yield </strong> – Collect rewards from bribes,
                    LP lending, emissions, vault fees and potential airdrops.
                  </li>
                  <li>
                    <strong>Trade (Flexible Vaults Only) </strong> – Sell your
                    locked position on marketplaces during lock in period
                  </li>
                  <li>
                    <strong>Withdraw</strong> – Redeem your initial funds +
                    Yield + [REDACTED] after the lock period ends.
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex gap-4 font-semibold max-md:gap-2 max-md:text-xs">
              <button
                onClick={() => setCurrentPage(0)}
                className="flex-1 rounded-md border border-black p-1 shadow-[0_4px_4px_#BFBFBF] max-md:p-2"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentPage(2)}
                className="bg-yellow max-md;p-2 flex-1 rounded-md border border-black shadow-[0_4px_4px_#BFBFBF]"
              >
                Next
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <img
              width="550px"
              className="w-full"
              src="/images/rewards.webp"
              alt="banner"
            />
            <div className="p-4">
              <h2 className="text-xl font-extrabold">Purr with rewards! </h2>
              <p className="py-1 text-sm">
                With <strong> NFT Time-Lock Vaults</strong>, your funds work for
                you. <strong> Fixed Vaults</strong>
                offer higher yields, while <strong>Flexible Vaults</strong>
                keeps you liquid. Enjoy exclusive perks and airdrops beyond
                bribes and watch your Vault NFT’s backing as it stacks
                multi-layered yield.
              </p>
              <div className="mt-4 flex gap-4 font-semibold max-md:gap-2 max-md:text-xs">
                <button
                  onClick={() => setCurrentPage(1)}
                  className="h-9 flex-1 rounded-md border border-black shadow-[0_4px_4px_#BFBFBF] max-md:p-2"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentPage(3)}
                  className="bg-yellow max-md;p-2 flex-1 rounded-md border border-black shadow-[0_4px_4px_#BFBFBF]"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center gap-4 pb-4 [&>*]:px-4">
            <div className="w-full rounded-md bg-[#ADCB67] p-4">
              <h1 className="font-Bubblegum text-center text-3xl text-white">
                You’ve Been Cat-verted!{' '}
              </h1>
            </div>
            <img src="/images/sleepyCat.webp" alt="" />
            <p className="max-w-72 text-center">
              ongrats, you’re now part of felines! You’ve unlocked the secrets
              of NFT Time-Lock Vaults—bribes, multi-layer yield, Liquid NFTs,
              and all the juicy perks.
            </p>

            <button onClick={() => setCurrentPage(0)}>
              <DialogClose className="bg-yellow flex-1 rounded-md border border-black p-1 px-6 font-semibold shadow-[0_4px_4px_#BFBFBF] max-md:p-2">
                Scratch That—You’re Ready! 🐾
              </DialogClose>
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DialogContent className="bg-cream overflow-hidden rounded-2xl border-none p-0 sm:max-w-[550px] [&>button]:hidden">
      <DialogHeader className="hidden">
        <DialogTitle>Manual</DialogTitle>
        <DialogDescription>
          Its a manual for how to use the vault
        </DialogDescription>
      </DialogHeader>
      {renderContent()}
    </DialogContent>
  );
}
