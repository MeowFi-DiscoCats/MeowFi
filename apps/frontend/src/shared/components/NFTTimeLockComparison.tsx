import { ReactNode } from 'react';
import Timer from './svg/Timer';
import { LuCheck } from 'react-icons/lu';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface VaultSectionProps {
  heading: string;
  features: Feature[];
}

const GradientOverlay = () => (
  <div className="absolute top-0 right-0 z-0 flex h-[200%] w-full flex-col gap-1 overflow-hidden py-1 opacity-10">
    <div className="h-6 w-full bg-white/90" />
    <div className="h-6 w-full bg-white/80" />
    <div className="h-6 w-full bg-white/70" />
    <div className="h-6 w-full bg-white/60" />
    <div className="h-6 w-full bg-white/40" />
    <div className="h-6 w-full bg-white/30" />
    <div className="h-6 w-full bg-white/20" />
    <div className="h-6 w-full bg-white/10" />
  </div>
);

const FeatureItem = ({ feature }: { feature: Feature }) => (
  <div className="bg-cream relative z-[1] flex items-center justify-between gap-2 rounded-xl p-3">
    {feature.icon}
    <div className="mr-auto">
      <p>{feature.title}</p>
      <p className="font-Teko text-sm leading-4 font-semibold tracking-wider">
        {feature.description}
      </p>
    </div>
    <LuCheck size="30px" className="text-amber ml-8" />
  </div>
);

const VaultSection = ({ heading, features }: VaultSectionProps) => (
  <div className="max-lg:w-full max-lg:flex-1">
    <h1 className="text-gunmetal border-gunmetal border bg-[#F4F1D0] px-8 py-3 font-semibold">
      {heading}
    </h1>
    <div className="border-gunmetal relative flex w-full flex-col gap-2 overflow-hidden border-x border-b bg-[#D85E4C] p-4 px-8 max-sm:px-4">
      <GradientOverlay />
      {features.map((feature, index) => (
        <FeatureItem key={index} feature={feature} />
      ))}
    </div>
  </div>
);

export default function NFTTimeLockComparison({
  children,
}: {
  children: ReactNode;
}) {
  const fixedFeatures: Feature[] = [
    {
      icon: <img width="32px" src="/images/tradingCard.webp" alt="plant" />,
      title: 'Tradable Position',
      description: 'It is not tradable > NFTs are Locked',
    },
    {
      icon: <img width="32px" src="/images/plant.webp" alt="plant" />,
      title: 'Boosted Yield',
      description: 'Fixed Vault earns boosted yield',
    },
    {
      icon: <Timer />,
      title: 'Time and NFT Lock',
      description: 'Locked NFT - Time Lock',
    },
  ];

  const flexibleFeatures: Feature[] = [
    {
      icon: <img width="32px" src="/images/tradingCard.webp" alt="plant" />,
      title: 'Tradable Position',
      description: 'It is not tradable > NFTs are Locked',
    },
    {
      icon: <img width="32px" src="/images/plant.webp" alt="plant" />,
      title: 'Stable Yield',
      description: 'Multi-layer yield',
    },
    {
      icon: <Timer />,
      title: 'Time and NFT Lock',
      description: 'Liquid NFT - Time Lock',
    },
  ];

  return (
    <section className="px-[3vw] py-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-10 max-lg:flex-col max-lg:gap-4">
        <VaultSection
          heading="Fixed NFT Time-Lock Vaults"
          features={fixedFeatures}
        />
        <div>{children}</div>
        <VaultSection
          heading="Flexible NFT Time-Lock Vaults"
          features={flexibleFeatures}
        />
      </div>
    </section>
  );
}
