import VaultCard from './VaultCard';
import { vaults } from '@/data/vaults';
import CurvanceXFastlaneCard from './CurvanceXFastlaneCard';
import { useLiveFetch } from '@/lib/hooks/useFetch';

export default function TimeVaultSection() {
  useLiveFetch();

  return (
    <div className="flex flex-wrap justify-center gap-8 max-lg:gap-4">
      {vaults.length > 0 &&
        vaults.map((card, index) =>
          card.title === 'Curvance x Fastlane' ? (
            <CurvanceXFastlaneCard key={index} index={index} />
          ) : (
            <VaultCard key={index} index={index} />
          )
        )}
    </div>
  );
}
