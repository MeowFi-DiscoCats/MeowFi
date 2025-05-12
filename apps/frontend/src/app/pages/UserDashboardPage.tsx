import CatEar from '@/components/svg/CatEar';
import Header from '@/features/userDashboard/components/Header';
import LiquidNft from '@/features/userDashboard/components/LiquidNft';
import Position from '@/features/userDashboard/components/Position';
import TotalAssets from '@/features/userDashboard/components/TotalAssets';

export default function UserDashboardPage() {
  return (
    <>
      <section className="px-[3vw] py-10 pt-20 max-[550px]:pt-10">
        <div className="bg-cream border-saffron relative mx-auto min-h-[558px] max-w-6xl rounded-2xl border-4 p-6 max-md:px-4 max-sm:rounded-none">
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
          <Header />
          <TotalAssets />
          <Position />
          <LiquidNft />
        </div>
      </section>
    </>
  );
}
