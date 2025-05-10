import HeaderCarousel from '@/components/HeaderCarousel';
import ReferralDialog from '@/components/ReferralDialog';

export default function Header() {
  return (
    <div>
      <h1 className="font-Showcard text-[28px] text-black uppercase sm:text-4xl [518px]:text-nowrap">
        Meowboard
      </h1>
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
    </div>
  );
}
