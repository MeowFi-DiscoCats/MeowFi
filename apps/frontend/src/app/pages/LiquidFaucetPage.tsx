import ReTwitte from '@/components/svg/ReTwitte';
import CatEar from '@/components/svg/CatEar';
import { FaDiscord } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Triangle from '@/components/svg/Triangle';
import Scale from '@/components/svg/Scale';
import HourGlass from '@/components/svg/HourGlass';
import { LuCheck, LuZap } from 'react-icons/lu';
import AirDrop from '@/components/svg/AirDrop';
import VaultYieldCard from '@/components/VaultYieldCard';
import { Link } from 'react-router-dom';

export default function LiquidFaucetPage() {
  const data = {
    totalNFTs: 1000,
    claimedNFTs: 300,
    poweredBy: 'Partner Name',
    initialLiquidBacking: '0.15 MON',
    timeLock: '30',
    layer: '5',
    yeildValue: '0.15',
    backingRatio: '0.15',
    backingPercentage: '45',
    tokenSymbol: 'MON',
    lockedInPeriod: '30',
    vault: 'lending',
    type: 'Flexible',
    price: '0.15',
  };

  const tasks = [
    {
      title: 'Follow @mydiscocats on Twitter ( X )',
      url: 'https://x.com/mydiscocats',
      completed: false,
      icon: <FaXTwitter />,
    },
    {
      title: 'Join @mydiscocats Discord Channel ( Be part of the fam )',
      url: 'https://discord.com/invite/RZWntTWFrb',
      completed: false,
      icon: <FaDiscord />,
    },
    {
      title: 'Engage by Liking & RT announcement on Twitter ( X )',
      url: 'https://x.com/mydiscocats',
      completed: false,
      icon: <ReTwitte />,
    },
  ];

  const progressPercentage = (data.claimedNFTs / data.totalNFTs) * 100;

  return (
    <section className="text-cream mt-4 overflow-hidden px-[3vw] py-10 pt-20">
      <div className="fixed inset-0 z-[2] flex items-center justify-center bg-black/80 text-4xl text-white">
        <div className="bg-cream mx-[5vw] max-w-md overflow-hidden rounded-xl">
          <div className="bg-sky overflow-hidden">
            <h1 className="font-Showcard -mb-8 px-4 pt-8 text-center text-3xl">
              Opening Soon
            </h1>
            <img
              src="/images/openingSoon.webp "
              className="translate-y-12 px-8"
            />
          </div>
          <div className="flex flex-col justify-center px-8 py-4">
            <h2 className="text-2xl font-bold text-black">
              Stay thirsty, the drips coming thooon!!
            </h2>
            <p className="text-normal text-sm text-black">
              We’ll be opening the <strong>Liquid Faucet</strong> along with our
              <strong> AI-Yield Aggregator</strong> very thoon 🐾—perfect time
              to try our <strong>Time-Lock Vaults</strong>. The cats are ready
              to flow the liquidity. 🐱💧
            </p>
            <Link
              to="/"
              className="bg-yellow mx-auto mt-3 rounded-md border border-black p-1 px-4 text-sm text-black shadow-[0_4px_4px_#BFBFBF]"
            >
              Show me around
            </Link>
          </div>
        </div>
      </div>
      <div className="border-cream relative mx-auto min-h-[500px] max-w-6xl rounded-xl border-3 bg-[#121212] py-6 max-sm:rounded-none">
        <img
          width="100"
          className="absolute -top-7 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 transform"
          src="/images/welcomeCat.webp"
          alt="Welcome Cat"
        />
        <div className="absolute -top-10 left-[10%] -z-10 scale-x-[-1] transform">
          <CatEar />
        </div>
        <div className="absolute -top-10 right-[10%] -z-10">
          <CatEar />
        </div>
        <div className="flex flex-col items-center gap-4 px-6 pt-12 max-md:px-4">
          <h1 className="font-Showcard py-4 text-center text-6xl text-white max-md:text-4xl max-sm:text-3xl">
            Liquid NFT Faucet
          </h1>
          <h2 className="text-yellow font-Bubblegum max-w-[20ch] text-center text-4xl max-md:text-3xl max-sm:text-2xl">
            Claim NFTs Backed by Real Liquidity
          </h2>

          <div className="bg-gunmetal relative my-6 h-6 w-full max-w-[600px] rounded-full border p-1">
            <span className="font-Bubblegum absolute right-0 -bottom-7 text-white">
              NFTs: {data.totalNFTs}
            </span>
            <div
              className="bg-amber relative h-full rounded-full"
              style={{ width: `${progressPercentage}%` }}
            >
              <img
                width="100"
                className="absolute -top-1 right-0 translate-x-1/2 -translate-y-1/2"
                src="/images/progressCat.webp"
                alt="progress"
              />
            </div>
          </div>
          <h4 className="font-Bubblegum pt-8 text-xl text-white">
            <span className="text-yellow font-Bubblegum py-4">
              Powered By:{' '}
            </span>
            {data.poweredBy} NFT Time-Lock Vault
          </h4>
          <div className="shadow-yellow flex w-full max-w-4xl flex-wrap justify-between gap-8 rounded-2xl border bg-[linear-gradient(to_bottom,rgba(33,33,33,0.2)_70%,rgba(255,253,237,0.2)_94%)] px-12 py-6 text-center shadow-[0_4px_4px] max-md:justify-center">
            <div className="flex flex-col items-center gap-2">
              <span className="font-Showcard text-3xl">
                ${data.initialLiquidBacking}
              </span>
              <span className="font-Bubblegum">Inital Liquid Backing</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="font-Showcard text-3xl">{data.totalNFTs}</span>
              <span className="font-Bubblegum">Vault Supply</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="font-Showcard text-3xl">{data.timeLock}D</span>
              <span className="font-Bubblegum">Time Lock</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="font-Showcard text-3xl">{data.layer}</span>
              <span className="font-Bubblegum">Multi-layer yeild</span>
            </div>
          </div>
          <h4 className="font-Bubblegum pt-8 text-2xl text-white">
            Complete Tasks to Claim{' '}
            <span className="text-yellow font-Bubblegum">Liquid NFT</span> from
            the Faucet
          </h4>
          <div className="flex flex-col gap-3">
            {tasks.map((task, index) => (
              <div
                key={index}
                className="bg-gunmetal flex items-center justify-between gap-4 border-2 border-black p-2"
              >
                <div className="flex items-center gap-2">
                  <span className="bg-cream text-gunmetal border p-1 text-xl">
                    {task.icon}
                  </span>
                  <span className="font-Bubblegum">
                    <span className="font-Bubblegum text-yellow mr-1">
                      Task {index + 1} :
                    </span>
                    {task.title}
                  </span>
                </div>
                <a
                  href={task.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-cream rounded-full border-2 border-black p-1 text-sm text-black"
                ></a>
              </div>
            ))}
          </div>
          <button className="shadow-yellow bg-cream font-Bubblegum my-8 border-2 border-black p-2 px-12 text-black shadow-[0_4px_4px] hover:bg-gray-200">
            Claim NFT
          </button>
        </div>
        <section className="flex w-full flex-col items-center justify-center border-t-2 border-zinc-600">
          <h4 className="pt-12 text-center text-4xl font-semibold text-white">
            {data.poweredBy}
          </h4>
          <p className="flex gap-4 py-4">
            <span>
              <span className="text-amber mr-1 font-semibold">Type :</span>
              {data.type}
            </span>
            <span>
              <span className="text-amber mr-1 font-semibold">Vault :</span>
              {data.vault}
            </span>
          </p>
          <div className="flex w-full max-w-3xl items-center justify-center gap-8 px-4 py-8 max-[700px]:flex-col">
            <div className="mt-4 flex min-h-80 w-full flex-1 gap-3">
              <div className="flex flex-1 flex-col gap-3">
                <div className="bg-gunmetal flex flex-1 items-center justify-center rounded-xl border border-zinc-500 p-4">
                  <div className="flex items-center justify-center gap-2 text-white">
                    <HourGlass />
                    <div>
                      <p className="font-Teko text-3xl font-semibold">
                        {data.lockedInPeriod}D
                      </p>
                      <p className="font-thin">Remaining</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gunmetal relative flex flex-1 flex-col items-center justify-end gap-2 overflow-hidden rounded-xl border border-zinc-500 p-4 text-white">
                  <div className="absolute top-4 left-0 h-full w-full">
                    <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 transform drop-shadow-[0_0_6px_rgba(255,255,0,0.6)]">
                      <Triangle />
                    </div>

                    <Scale />
                  </div>
                  <p className="font-Teko font-semibold">
                    <span className="mr-1 text-2xl">{data.yeildValue}</span>
                    {data.tokenSymbol}
                  </p>
                  <p className="text-center text-sm font-thin">
                    Yield Generated
                  </p>
                </div>
              </div>

              <div className="bg-gunmetal flex flex-1 flex-col rounded-xl border border-zinc-500 p-3 px-4">
                <h5 className="font-Teko text-center font-semibold tracking-wider text-white">
                  NFT Backing
                </h5>
                <div className="mx-auto mt-4 mb-1 h-4 w-10 rounded-full border-2 border-white/12 bg-white/10" />
                <div className="relative w-full flex-1">
                  <div
                    className="bg-amber absolute bottom-2 left-2 max-h-[calc(100%-16px)] w-[calc(100%-16px)] rounded-xl"
                    style={{
                      height: `${data.backingPercentage}%`,
                    }}
                  />
                  <div className="relative z-[1] flex h-full flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-white/12 bg-white/10 backdrop-blur-sm">
                    <p className="font-Teko flex items-center text-xl text-white">
                      <LuZap />{' '}
                      <span className="font-Teko mr-1 text-xl">Ratio:</span>
                      {data.backingRatio}
                    </p>
                    <p className="font-Teko text-3xl font-bold text-white">
                      {data.backingPercentage}
                      <span className="font-Teko ml-1 text-sm">%</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-full w-full flex-1 flex-col gap-3 rounded-xl">
              <div className="bg-gunmetal flex items-center justify-between gap-2 rounded-xl border border-zinc-500 p-2">
                <div className="flex items-center gap-2">
                  <img
                    width="30"
                    className="p-[1px] shadow"
                    src="/images/danceCat.webp"
                    alt="NFTs"
                  />
                  <div>
                    <p>Vault Info</p>
                    <p className="font-Teko text-xl font-semibold tracking-wider">
                      {data.totalNFTs} @ ${data.price} in {data.tokenSymbol}
                    </p>
                  </div>
                </div>
                <img width="30" src="/images/lightingBolt.webp" alt="points" />
              </div>

              <div className="from-crimson/10 to-crimson flex w-full items-center gap-2 rounded-xl border border-zinc-500 bg-gradient-to-t p-2 text-white">
                <AirDrop />
                <div>
                  <p className="font-thin">Extra Fries !!</p>
                  <h4 className="font-Teko font-semibold">
                    Airdrop Incentivised
                  </h4>
                </div>
                <LuCheck size="30px" className="ml-auto" />
              </div>
              <VaultYieldCard />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
