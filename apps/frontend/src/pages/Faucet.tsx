import CatEar from '../components/svg/CatEar';

export default function Faucet() {
  const data = {
    totalNFTs: 1000,
    claimedNFTs: 100,
  };

  const progressPercentage = (data.claimedNFTs / data.totalNFTs) * 100;

  return (
    <section className="mt-4 px-[3vw] py-10 pt-20">
      <div className="border-cream relative mx-auto flex min-h-[500px] max-w-6xl flex-col items-center gap-4 rounded-xl border-3 bg-[#121212] p-6 max-md:px-4 max-sm:rounded-none">
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
        <h1 className="font-Showcard py-4 text-6xl text-white">
          Liquid NFT Faucet
        </h1>
        <h2 className="text-yellow font-Bubblegum max-w-[20ch] text-center text-4xl">
          Claim NFTs Backed by Real Liquidity
        </h2>
        <div className="bg-gunmetal my-6 h-6 w-full max-w-[600px] rounded-full border p-1">
          <div
            className="bg-amber h-full rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </section>
  );
}
