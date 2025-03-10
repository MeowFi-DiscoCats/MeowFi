import CatEar from '@/components/svg/CatEar';
import VaultHeader from './VaultHeader';
import VaultCard from './VaultCard';
import { useQuery } from '@tanstack/react-query';
import { IVault } from '../../../backend/src/models/IVault';

const apiUrl = import.meta.env.VITE_API_URL;

const fetchData = async (): Promise<IVault[]> => {
  const response = await fetch(`${apiUrl}/vault`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export default function VaultGrid() {
  const { data, error, isLoading } = useQuery<IVault[], Error>(
    ['vaults'],
    fetchData
  );

  return (
    <section className="px-[3vw] py-10 pt-20 max-[550px]:pt-10">
      <div className="bg-cream border-saffron relative mx-auto min-h-[600px] max-w-[1100px] rounded-2xl border-4 p-6 max-md:px-4 max-sm:rounded-none">
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
        <VaultHeader />

        {isLoading ? (
          <div className="flex h-full flex-col items-center justify-center py-12">
            <img
              src="/images/sleepyCat.webp"
              alt="Loading"
              className="mb-4 w-32"
            />
            <p className="text-center text-lg">Loading...</p>
          </div>
        ) : error ? (
          <div className="flex h-full flex-col items-center justify-center py-12">
            <img
              src="/images/sleepyCat.webp"
              alt="Error"
              className="mb-4 w-32"
            />
            <p className="text-center text-lg text-red-500">
              Error: {error.message}
            </p>
          </div>
        ) : !data || data.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center py-12">
            <img
              src="/images/sleepyCat.webp"
              alt="No Data"
              className="mb-4 w-32"
            />
            <p className="text-center text-lg">No data available</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8 max-lg:gap-4">
            {data.map((card, index) => (
              <VaultCard key={index} index={index} vault={card} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
