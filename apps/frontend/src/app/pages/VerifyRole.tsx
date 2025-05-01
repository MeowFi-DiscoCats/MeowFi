import VerifyGrid from '@/features/verifyRole/components/VerifyGrid';

export default function VerifyRole() {
  return (
    <section className="px-[3vw] py-10 pt-20 max-[550px]:pt-10">
      <div className="relative mx-auto min-h-[558px] max-w-6xl rounded-2xl border-4 border-white bg-[#161616] p-6 pb-24 max-md:px-4 max-sm:rounded-none">
        <p className="font-Bubblegum text-right text-sm text-white">
          Made with 🤍 with the Chogstars team!
        </p>
        <h1 className="font-Showcard mt-10 text-center text-6xl text-white max-md:text-5xl max-sm:text-4xl">
          Verify Discord
        </h1>
        <h2 className="font-Showcard text-yellow my-2 text-center text-6xl max-md:text-5xl max-sm:text-4xl">
          Roles
        </h2>
        <p className="font-Bubblegum text-center text-3xl text-white max-md:text-2xl max-sm:text-xl">
          Verify NFT to claim your discord role for{' '}
          <span className="text-yellow font-Bubblegum">Liquid NFT</span>
        </p>
        <VerifyGrid />
      </div>
    </section>
  );
}
