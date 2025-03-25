import ReTwitte from '@/components/svg/ReTwitte';
import CatEar from '../components/svg/CatEar';
import { FaDiscord } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Link from '@/components/svg/Link';

export default function Faucet() {
  const data = {
    totalNFTs: 1000,
    claimedNFTs: 300,
    poweredBy: 'Partner Name',
    initialLiquidBacking: '0.15 MON',
    timeLock: '30',
    layer: '5',
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
    <section className="text-cream mt-4 px-[3vw] py-10 pt-20">
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
            <span className="text-yellow font-Bubblegum py-4">Powered By:</span>
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
                    <span className="font-Bubblegum text-yellow">
                      Task {index + 1}:
                    </span>
                    {task.title}
                  </span>
                </div>
                <a
                  href={task.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-cream rounded-full border-2 border-black p-1 text-sm text-black"
                >
                  <Link />
                </a>
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
          <p>
            <span>Type</span>
          </p>
        </section>
      </div>
    </section>
  );
}
