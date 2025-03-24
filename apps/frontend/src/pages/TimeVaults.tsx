import CommunityCTA from '@/components/CommunityCTA';
import FAQSection from '@/components/FAQSection';
import MascotShowcase from '@/components/MascotShowcase';
import NFTTimeLockComparison from '@/components/NFTTimeLockComparison';
import VaultGrid from '@/components/VaultGrid';

export default function TimeVaults() {
  return (
    <>
      <VaultGrid />
      <NFTTimeLockComparison>
        <MascotShowcase />
      </NFTTimeLockComparison>
      <section className="px-[3vw] py-10">
        <div className="mx-auto flex max-w-6xl gap-6 max-md:flex-col max-md:gap-16">
          <FAQSection />
          <CommunityCTA />
        </div>
      </section>
    </>
  );
}
